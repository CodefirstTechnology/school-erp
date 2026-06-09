import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

interface TeacherKpi {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
}

interface ClassSession {
  time: string;
  className: string;
  subject: string;
  room: string;
  students: number;
  status: 'ongoing' | 'upcoming' | 'done';
}

interface PendingTask {
  title: string;
  type: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  sidebarOpen = false;
  teacherName = 'Mrs. Sneha Gupta';
  employeeId = 'EMP-2024-001';
  department = 'Mathematics';
  currentDate = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  kpiCards: TeacherKpi[] = [
    { title: 'My Classes', value: '5', subtitle: '142 students total', icon: 'classes', color: 'purple' },
    { title: 'Attendance Today', value: '94%', subtitle: 'Marked for 3 of 5 classes', icon: 'attendance', color: 'success' },
    { title: 'Pending Reviews', value: '12', subtitle: 'Assignments to grade', icon: 'reviews', color: 'warning' },
    { title: 'Avg. Class Score', value: '86%', subtitle: 'Across all subjects', icon: 'score', color: 'info' }
  ];

  todayClasses: ClassSession[] = [
    { time: '8:00 AM', className: 'Class 10-A', subject: 'Mathematics', room: 'Room 204', students: 42, status: 'done' },
    { time: '9:30 AM', className: 'Class 9-B', subject: 'Mathematics', room: 'Room 204', students: 38, status: 'done' },
    { time: '11:00 AM', className: 'Class 11-C', subject: 'Advanced Math', room: 'Room 301', students: 32, status: 'ongoing' },
    { time: '1:00 PM', className: 'Class 8-A', subject: 'Mathematics', room: 'Room 112', students: 36, status: 'upcoming' },
    { time: '2:30 PM', className: 'Class 12-A', subject: 'Calculus', room: 'Room 301', students: 28, status: 'upcoming' }
  ];

  pendingTasks: PendingTask[] = [
    { title: 'Grade Physics integration quiz', type: 'Grading', dueDate: 'Today', priority: 'high' },
    { title: 'Upload lesson plan — Week 24', type: 'Lesson Plan', dueDate: 'Jun 10', priority: 'medium' },
    { title: 'Submit Class 10-A attendance', type: 'Attendance', dueDate: 'Today', priority: 'high' },
    { title: 'Parent meeting — Aarav Sharma', type: 'Meeting', dueDate: 'Jun 12', priority: 'low' }
  ];

  ngOnInit(): void {
    if (!this.auth.isLoggedInAs('teacher')) {
      this.router.navigate(['/login/teacher']);
      return;
    }
    const saved = localStorage.getItem('eduflow-user');
    if (saved) this.employeeId = saved;
  }

  toggleSidebar(): void { this.sidebarOpen = !this.sidebarOpen; }
  closeSidebar(): void { this.sidebarOpen = false; }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      ongoing: 'badge-purple', upcoming: 'badge-info', done: 'badge-success',
      high: 'badge-danger', medium: 'badge-warning', low: 'badge-info'
    };
    return map[status] || 'badge-info';
  }
}
