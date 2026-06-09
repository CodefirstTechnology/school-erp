import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getRoleById, UserRole } from '../auth.models';

@Component({
  selector: 'app-role-login',
  templateUrl: './role-login.component.html',
  styleUrls: ['./role-login.component.css']
})
export class RoleLoginComponent implements OnInit {
  role: UserRole | undefined;
  identifier = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const roleId = this.route.snapshot.paramMap.get('role') || '';
    this.role = getRoleById(roleId);
    if (!this.role) {
      this.router.navigate(['/login']);
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  signIn(): void {
    if (!this.role) return;

    if (!this.identifier.trim() || !this.password.trim()) {
      this.errorMessage = 'Please enter your credentials to continue.';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    setTimeout(() => {
      localStorage.setItem('eduflow-role', this.role!.id);
      localStorage.setItem('eduflow-user', this.identifier.trim());
      this.isLoading = false;
      this.router.navigate([this.role!.redirectTo]);
    }, 900);
  }

  backToRoles(): void {
    this.router.navigate(['/login']);
  }
}
