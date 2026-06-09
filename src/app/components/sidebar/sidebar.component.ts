import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../pages/auth/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router, private auth: AuthService) {}

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Admissions', icon: 'admissions', route: '/admissions' },
    { label: 'Students', icon: 'students', route: '/students' },
    { label: 'Teachers', icon: 'teachers', route: '/teachers' },
    { label: 'HR Management', icon: 'hr', route: '/hr' },
    { label: 'Finance', icon: 'finance', route: '/finance' },
    { label: 'Transport', icon: 'transport', route: '/transport' },
    { label: 'Reports', icon: 'reports', route: '/reports' },
    { label: 'AI Insights', icon: 'ai', route: '/ai-insights', badge: 'New' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
