import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    const remembered = localStorage.getItem('eduflow-remember-admin');
    if (remembered) {
      this.email = remembered;
      this.rememberMe = true;
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Please enter your admin email and password.';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    setTimeout(() => {
      if (!this.auth.validate('admin', this.email, this.password)) {
        this.errorMessage = 'Invalid admin email or password. Use admin@gmail.com / admin123';
        this.isLoading = false;
        return;
      }

      this.auth.login('admin', this.email);
      if (this.rememberMe) {
        localStorage.setItem(this.auth.rememberKey('admin'), this.email.trim());
      } else {
        localStorage.removeItem(this.auth.rememberKey('admin'));
      }
      this.isLoading = false;
      this.router.navigate(['/admin/dashboard']);
    }, 900);
  }

  back(): void {
    this.router.navigate(['/login']);
  }
}
