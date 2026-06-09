import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-parent-login',
  templateUrl: './parent-login.component.html',
  styleUrls: ['./parent-login.component.css']
})
export class ParentLoginComponent implements OnInit {
  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    const remembered = localStorage.getItem('eduflow-remember-parent');
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
      this.errorMessage = 'Please enter your email and password.';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    setTimeout(() => {
      if (!this.auth.validate('parent', this.email, this.password)) {
        this.errorMessage = 'Invalid email or password. Use parent@email.com / parent123';
        this.isLoading = false;
        return;
      }

      this.auth.login('parent', this.email);
      if (this.rememberMe) {
        localStorage.setItem(this.auth.rememberKey('parent'), this.email.trim());
      } else {
        localStorage.removeItem(this.auth.rememberKey('parent'));
      }
      this.isLoading = false;
      this.router.navigate(['/parent/dashboard']);
    }, 900);
  }

  back(): void {
    this.router.navigate(['/login']);
  }
}
