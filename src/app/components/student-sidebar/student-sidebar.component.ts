import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../pages/auth/auth.service';

export interface StudentNavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.css']
})
export class StudentSidebarComponent {
  @Input() activeId = 'dashboard';
  @Input() mobileOpen = false;
  @Output() mobileClose = new EventEmitter<void>();

  studentName = 'Aarav Sharma';
  studentClass = 'Class 10-A';

  navItems: StudentNavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', route: '/student/dashboard' },
    { id: 'attendance', label: 'Attendance', icon: 'attendance', route: '/student/dashboard' },
    { id: 'homework', label: 'Homework', icon: 'homework', route: '/student/dashboard' },
    { id: 'assignments', label: 'Assignments', icon: 'assignments', route: '/student/dashboard', badge: '3' },
    { id: 'timetable', label: 'Timetable', icon: 'timetable', route: '/student/dashboard' },
    { id: 'exams', label: 'Exam Results', icon: 'exams', route: '/student/dashboard' },
    { id: 'fees', label: 'Fees', icon: 'fees', route: '/student/dashboard' },
    { id: 'ai', label: 'AI Learning Assistant', icon: 'ai', route: '/student/dashboard', badge: 'AI' },
    { id: 'profile', label: 'Profile', icon: 'profile', route: '/student/dashboard' }
  ];

  constructor(private router: Router, private auth: AuthService) {}

  isActive(item: StudentNavItem): boolean {
    return item.id === this.activeId;
  }

  navigate(item: StudentNavItem): void {
    this.mobileClose.emit();
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
