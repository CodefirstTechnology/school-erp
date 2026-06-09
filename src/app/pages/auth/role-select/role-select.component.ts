import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROLE_SELECT_ROLES, UserRole } from '../auth.models';

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.css']
})
export class RoleSelectComponent {
  roles = ROLE_SELECT_ROLES;

  constructor(private router: Router) {}

  continueAs(role: UserRole): void {
    this.router.navigate([role.loginRoute]);
  }
}
