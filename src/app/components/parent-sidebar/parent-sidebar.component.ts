import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../pages/auth/auth.service';

interface ParentNavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-parent-sidebar',
  templateUrl: './parent-sidebar.component.html',
  styleUrls: ['./parent-sidebar.component.css']
})
export class ParentSidebarComponent {
  @Input() activeId = 'dashboard';
  @Input() mobileOpen = false;
  @Output() mobileClose = new EventEmitter<void>();

  parentName = 'Priya Sharma';
  childInfo = 'Parent of Aarav · Class 10-A';

  navItems: ParentNavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', route: '/parent/dashboard' },
    { id: 'progress', label: 'Child Progress', icon: 'progress', route: '/parent/dashboard' },
    { id: 'attendance', label: 'Attendance', icon: 'attendance', route: '/parent/dashboard' },
    { id: 'grades', label: 'Grades', icon: 'grades', route: '/parent/dashboard' },
    { id: 'fees', label: 'Fees & Payments', icon: 'fees', route: '/parent/dashboard', badge: '1' },
    { id: 'messages', label: 'Messages', icon: 'messages', route: '/parent/dashboard' },
    { id: 'events', label: 'School Events', icon: 'events', route: '/parent/dashboard' },
    { id: 'profile', label: 'Profile', icon: 'profile', route: '/parent/dashboard' }
  ];

  constructor(private router: Router, private auth: AuthService) {}

  isActive(item: ParentNavItem): boolean {
    return item.id === this.activeId;
  }

  navigate(item: ParentNavItem): void {
    this.mobileClose.emit();
    this.router.navigate([item.route]);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
