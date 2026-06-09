import { Injectable } from '@angular/core';
import { RoleId } from './auth.models';

export interface AuthSession {
  role: RoleId;
  user: string;
}

interface DemoAccount {
  identifier: string;
  password: string;
  aliases?: string[];
}

const DEMO_ACCOUNTS: Record<RoleId, DemoAccount[]> = {
  student: [
    { identifier: 'STU-10-A-1042', password: 'student123', aliases: ['student@school.edu'] }
  ],
  teacher: [
    { identifier: 'EMP-2024-001', password: 'teacher123', aliases: ['teacher@school.edu'] }
  ],
  parent: [
    { identifier: 'parent@email.com', password: 'parent123' }
  ],
  admin: [
    { identifier: 'admin@gmail.com', password: 'admin123', aliases: ['admin@school.edu.in'] }
  ]
};

const SESSION_ROLE_KEY = 'eduflow-role';
const SESSION_USER_KEY = 'eduflow-user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  validate(role: RoleId, identifier: string, password: string): boolean {
    const normalizedId = identifier.trim().toLowerCase();
    const normalizedPass = password.trim();

    return DEMO_ACCOUNTS[role].some(account => {
      const ids = [account.identifier, ...(account.aliases ?? [])].map(id => id.toLowerCase());
      return ids.includes(normalizedId) && account.password === normalizedPass;
    });
  }

  login(role: RoleId, identifier: string): void {
    localStorage.setItem(SESSION_ROLE_KEY, role);
    localStorage.setItem(SESSION_USER_KEY, identifier.trim());
  }

  logout(): void {
    localStorage.removeItem(SESSION_ROLE_KEY);
    localStorage.removeItem(SESSION_USER_KEY);
  }

  getSession(): AuthSession | null {
    const role = localStorage.getItem(SESSION_ROLE_KEY) as RoleId | null;
    const user = localStorage.getItem(SESSION_USER_KEY);
    if (!role || !user) {
      return null;
    }
    return { role, user };
  }

  isLoggedInAs(role: RoleId): boolean {
    return this.getSession()?.role === role;
  }

  rememberKey(role: RoleId): string {
    return `eduflow-remember-${role}`;
  }
}
