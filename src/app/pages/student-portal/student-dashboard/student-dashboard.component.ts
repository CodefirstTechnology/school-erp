import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

interface DashboardKpi {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
  trend?: string;
  trendUp?: boolean;
}

interface ScheduleItem {
  time: string;
  subject: string;
  teacher: string;
  room: string;
  status: 'ongoing' | 'upcoming' | 'done';
}

interface Assignment {
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'overdue';
}

interface UpcomingExam {
  subject: string;
  date: string;
  time: string;
  type: string;
}

interface ActivityItem {
  text: string;
  time: string;
  type: 'assignment' | 'grade' | 'attendance' | 'announcement';
}

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}
  sidebarOpen = false;
  studentName = 'Aarav Sharma';
  studentClass = 'Class 10-A';
  studentId = 'STU-10-A-1042';
  currentDate = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  kpiCards: DashboardKpi[] = [
    { title: 'Attendance %', value: '92%', subtitle: '46 of 50 days present', icon: 'attendance', color: 'success', trend: '+2%', trendUp: true },
    { title: 'Assignments Pending', value: '3', subtitle: '1 overdue · 2 due this week', icon: 'assignments', color: 'warning', trend: '3 left', trendUp: false },
    { title: 'Upcoming Exams', value: '2', subtitle: 'Next: Mathematics · Jun 12', icon: 'exams', color: 'info' },
    { title: 'GPA Score', value: '3.84', subtitle: 'Grade A · Top 15% of class', icon: 'gpa', color: 'purple', trend: '+0.12', trendUp: true }
  ];

  attendanceWeek = [
    { day: 'Mon', present: true },
    { day: 'Tue', present: true },
    { day: 'Wed', present: true },
    { day: 'Thu', present: false },
    { day: 'Fri', present: true },
    { day: 'Sat', present: true }
  ];

  todaySchedule: ScheduleItem[] = [
    { time: '8:00 AM', subject: 'Mathematics', teacher: 'Mrs. Gupta', room: 'Room 204', status: 'done' },
    { time: '9:00 AM', subject: 'Physics', teacher: 'Mr. Verma', room: 'Lab 1', status: 'done' },
    { time: '10:30 AM', subject: 'English', teacher: 'Ms. Nair', room: 'Room 112', status: 'ongoing' },
    { time: '12:00 PM', subject: 'Chemistry', teacher: 'Dr. Singh', room: 'Lab 2', status: 'upcoming' },
    { time: '2:00 PM', subject: 'Computer Science', teacher: 'Mr. Patel', room: 'Lab 3', status: 'upcoming' }
  ];

  assignments: Assignment[] = [
    { title: 'Quadratic Equations Worksheet', subject: 'Mathematics', dueDate: 'Jun 10', status: 'pending' },
    { title: 'Physics Lab Report — Optics', subject: 'Physics', dueDate: 'Jun 11', status: 'pending' },
    { title: 'Essay: Climate Change', subject: 'English', dueDate: 'Jun 8', status: 'overdue' },
    { title: 'Organic Chemistry Quiz Prep', subject: 'Chemistry', dueDate: 'Jun 14', status: 'submitted' }
  ];

  upcomingExams: UpcomingExam[] = [
    { subject: 'Mathematics', date: 'Jun 12, 2026', time: '9:00 AM', type: 'Unit Test' },
    { subject: 'Physics', date: 'Jun 18, 2026', time: '9:00 AM', type: 'Mid-Term' },
    { subject: 'English', date: 'Jun 25, 2026', time: '10:30 AM', type: 'Oral Exam' }
  ];

  recentActivity: ActivityItem[] = [
    { text: 'Grade posted for Physics Lab Report', time: '2 hours ago', type: 'grade' },
    { text: 'New homework: Mathematics Chapter 5', time: 'Yesterday', type: 'assignment' },
    { text: 'Marked present for today', time: 'Today, 8:02 AM', type: 'attendance' },
    { text: 'School holiday announced — Jun 15', time: '2 days ago', type: 'announcement' }
  ];

  ngOnInit(): void {
    if (!this.auth.isLoggedInAs('student')) {
      this.router.navigate(['/login/student']);
      return;
    }
    const saved = localStorage.getItem('eduflow-user');
    if (saved) this.studentId = saved;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      ongoing: 'badge-purple', upcoming: 'badge-info', done: 'badge-success',
      pending: 'badge-warning', submitted: 'badge-success', overdue: 'badge-danger'
    };
    return map[status] || 'badge-info';
  }
}
