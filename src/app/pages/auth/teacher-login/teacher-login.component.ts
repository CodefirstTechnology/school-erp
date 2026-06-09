import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {
  employeeId = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    const remembered = localStorage.getItem('eduflow-remember-teacher');
    if (remembered) {
      this.employeeId = remembered;
      this.rememberMe = true;
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    if (!this.employeeId.trim() || !this.password.trim()) {
      this.errorMessage = 'Please enter your Employee ID and password.';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    setTimeout(() => {
      if (!this.auth.validate('teacher', this.employeeId, this.password)) {
        this.errorMessage = 'Invalid Employee ID or password. Use EMP-2024-001 / teacher123';
        this.isLoading = false;
        return;
      }

      this.auth.login('teacher', this.employeeId);
      if (this.rememberMe) {
        localStorage.setItem(this.auth.rememberKey('teacher'), this.employeeId.trim());
      } else {
        localStorage.removeItem(this.auth.rememberKey('teacher'));
      }
      this.isLoading = false;
      this.router.navigate(['/teacher/dashboard']);
    }, 900);
  }

  back(): void {
    this.router.navigate(['/login']);
  }
}
