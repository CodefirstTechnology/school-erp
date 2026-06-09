import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

interface KpiCard {
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
  trendUp?: boolean;
  icon: string;
  chartType?: 'line' | 'none';
}

interface AiInsight {
  title: string;
  description: string;
  confidence: number;
  action: string;
  type: 'risk' | 'forecast' | 'finance' | 'productivity';
}

interface Activity {
  activity: string;
  user: string;
  department: string;
  date: string;
  status: 'completed' | 'pending' | 'in-progress';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  schoolName = 'Greenwood International School';

  kpiCards: KpiCard[] = [
    {
      title: 'Total Students',
      value: '2,480',
      subtitle: 'Enrolled this academic year',
      trend: '+12%',
      trendUp: true,
      icon: 'students'
    },
    {
      title: 'Total Teachers',
      value: '186',
      subtitle: '168 active today',
      trend: '+4',
      trendUp: true,
      icon: 'teachers'
    },
    {
      title: 'Revenue',
      value: '₹4.85 Cr',
      subtitle: 'YTD collection · 93.2% rate',
      trend: '+8.2%',
      trendUp: true,
      icon: 'revenue',
      chartType: 'line'
    },
    {
      title: 'Attendance',
      value: '94.2%',
      subtitle: 'School-wide average today',
      trend: '+2.1%',
      trendUp: true,
      icon: 'attendance'
    }
  ];

  growthData = [3200, 3450, 3680, 3920, 4100, 4350, 4580, 4720, 4850];
  growthLabels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  attendanceData = [
    { label: 'Mon', value: 92 },
    { label: 'Tue', value: 95 },
    { label: 'Wed', value: 93 },
    { label: 'Thu', value: 96 },
    { label: 'Fri', value: 94 },
    { label: 'Sat', value: 88 }
  ];

  classPerformance = [
    { class: 'Class 10-A', score: 87, color: '#7C3AED' },
    { class: 'Class 9-B', score: 82, color: '#8B5CF6' },
    { class: 'Class 8-A', score: 79, color: '#A78BFA' },
    { class: 'Class 7-C', score: 91, color: '#22C55E' },
    { class: 'Class 6-B', score: 76, color: '#F59E0B' }
  ];

  aiInsights: AiInsight[] = [
    {
      title: 'Attendance Risk Prediction',
      description: '23 students in Class 8-B show declining attendance patterns over the past 2 weeks.',
      confidence: 92,
      action: 'Send parent notifications & schedule counselor meetings',
      type: 'risk'
    },
    {
      title: 'Student Performance Forecast',
      description: 'Board exam readiness score projected at 78% — 15 students need intervention in Mathematics.',
      confidence: 87,
      action: 'Assign remedial sessions for identified students',
      type: 'forecast'
    },
    {
      title: 'Fee Collection Insights',
      description: '₹12.3 Lakhs pending from 186 families. 42 accounts are 30+ days overdue.',
      confidence: 95,
      action: 'Trigger automated payment reminders',
      type: 'finance'
    },
    {
      title: 'Teacher Productivity Analysis',
      description: 'Science department lesson completion at 96%. English dept. needs 3 substitute arrangements.',
      confidence: 84,
      action: 'Review staffing allocation for English dept.',
      type: 'productivity'
    }
  ];

  recentActivities: Activity[] = [
    { activity: 'New student admission — Priya Sharma', user: 'Meera Patel', department: 'Admissions', date: 'Jun 8, 2026', status: 'completed' },
    { activity: 'Fee payment received — ₹45,000', user: 'Arun Desai', department: 'Accounts', date: 'Jun 8, 2026', status: 'completed' },
    { activity: 'Leave request — Dr. Sunita Rao', user: 'Sunita Rao', department: 'HR', date: 'Jun 7, 2026', status: 'pending' },
    { activity: 'Bus route B-12 GPS alert resolved', user: 'Vikram Singh', department: 'Transport', date: 'Jun 7, 2026', status: 'completed' },
    { activity: 'Quarterly report generated', user: 'Rajesh Kumar', department: 'Admin', date: 'Jun 6, 2026', status: 'completed' },
    { activity: 'Parent-teacher meeting scheduled', user: 'Anita Verma', department: 'Academics', date: 'Jun 6, 2026', status: 'in-progress' }
  ];

  getGrowthPath(): string {
    const max = Math.max(...this.growthData);
    const min = Math.min(...this.growthData);
    const range = max - min || 1;
    const w = 100;
    const h = 60;
    const points = this.growthData.map((v, i) => {
      const x = (i / (this.growthData.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 8) - 4;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  }

  getGrowthArea(): string {
    const line = this.getGrowthPath();
    return `${line} L 100,60 L 0,60 Z`;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      completed: 'badge-success',
      pending: 'badge-warning',
      'in-progress': 'badge-info'
    };
    return map[status] || 'badge-info';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      completed: 'Completed',
      pending: 'Pending',
      'in-progress': 'In Progress'
    };
    return map[status] || status;
  }

  ngOnInit(): void {
    if (!this.auth.isLoggedInAs('admin')) {
      this.router.navigate(['/login/admin']);
    }
  }
}
