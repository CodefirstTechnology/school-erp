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

interface ChildUpdate {
  title: string;
  detail: string;
  time: string;
  type: 'grade' | 'attendance' | 'fee' | 'event';
}

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.css']
})
export class ParentDashboardComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  sidebarOpen = false;
  parentName = 'Priya Sharma';
  childName = 'Aarav Sharma';
  childClass = 'Class 10-A';
  currentDate = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  kpiCards: DashboardKpi[] = [
    { title: 'Child Attendance', value: '92%', subtitle: '46 of 50 days present', icon: 'attendance', color: 'success', trend: '+2%', trendUp: true },
    { title: 'Overall Grade', value: 'A', subtitle: 'GPA 3.84 · Top 15% of class', icon: 'grades', color: 'purple', trend: '+0.12', trendUp: true },
    { title: 'Fee Status', value: '₹12,500', subtitle: 'Term 2 due · Jun 15', icon: 'fees', color: 'warning', trend: 'Due soon', trendUp: false },
    { title: 'School Alerts', value: '3', subtitle: '1 fee reminder · 2 announcements', icon: 'alerts', color: 'info' }
  ];

  recentUpdates: ChildUpdate[] = [
    { title: 'Mathematics Test Score', detail: 'Aarav scored 88/100 in Unit Test 3', time: '2 hours ago', type: 'grade' },
    { title: 'Attendance Marked', detail: 'Present for all classes today', time: 'Today, 9:00 AM', type: 'attendance' },
    { title: 'Fee Reminder', detail: 'Term 2 fee of ₹12,500 due by Jun 15', time: 'Yesterday', type: 'fee' },
    { title: 'Parent-Teacher Meeting', detail: 'Scheduled for Jun 20 · 4:00 PM', time: 'Jun 5', type: 'event' }
  ];

  ngOnInit(): void {
    if (!this.auth.isLoggedInAs('parent')) {
      this.router.navigate(['/login/parent']);
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }
}
