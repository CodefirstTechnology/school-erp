import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  studentId = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    const remembered = localStorage.getItem('eduflow-remember-student');
    if (remembered) {
      this.studentId = remembered;
      this.rememberMe = true;
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    if (!this.studentId.trim() || !this.password.trim()) {
      this.errorMessage = 'Please enter your Student ID and password.';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    setTimeout(() => {
      if (!this.auth.validate('student', this.studentId, this.password)) {
        this.errorMessage = 'Invalid Student ID or password. Use STU-10-A-1042 / student123';
        this.isLoading = false;
        return;
      }

      this.auth.login('student', this.studentId);
      if (this.rememberMe) {
        localStorage.setItem(this.auth.rememberKey('student'), this.studentId.trim());
      } else {
        localStorage.removeItem(this.auth.rememberKey('student'));
      }
      this.isLoading = false;
      this.router.navigate(['/student/dashboard']);
    }, 900);
  }

  backToRoles(): void {
    this.router.navigate(['/login']);
  }
}
