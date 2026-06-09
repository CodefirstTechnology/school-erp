import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../pages/auth/auth.service';

interface TeacherNavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-teacher-sidebar',
  templateUrl: './teacher-sidebar.component.html',
  styleUrls: ['./teacher-sidebar.component.css']
})
export class TeacherSidebarComponent {
  @Input() activeId = 'dashboard';
  @Input() mobileOpen = false;
  @Output() mobileClose = new EventEmitter<void>();

  teacherName = 'Mrs. Sneha Gupta';
  department = 'Mathematics · Senior Teacher';

  navItems: TeacherNavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', route: '/teacher/dashboard' },
    { id: 'classes', label: 'My Classes', icon: 'classes', route: '/teacher/dashboard' },
    { id: 'attendance', label: 'Attendance', icon: 'attendance', route: '/teacher/dashboard' },
    { id: 'assignments', label: 'Assignments', icon: 'assignments', route: '/teacher/dashboard', badge: '5' },
    { id: 'grades', label: 'Grades', icon: 'grades', route: '/teacher/dashboard' },
    { id: 'timetable', label: 'Timetable', icon: 'timetable', route: '/teacher/dashboard' },
    { id: 'students', label: 'Students', icon: 'students', route: '/teacher/dashboard' },
    { id: 'ai', label: 'AI Assistant', icon: 'ai', route: '/teacher/dashboard', badge: 'AI' },
    { id: 'profile', label: 'Profile', icon: 'profile', route: '/teacher/dashboard' }
  ];

  constructor(private router: Router, private auth: AuthService) {}

  isActive(item: TeacherNavItem): boolean {
    return item.id === this.activeId;
  }

  navigate(item: TeacherNavItem): void {
    this.mobileClose.emit();
    this.router.navigate([item.route]);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
