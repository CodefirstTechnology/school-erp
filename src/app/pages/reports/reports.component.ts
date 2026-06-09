import { Component } from '@angular/core';

interface ReportKpi {
  title: string;
  value: string;
  subtitle: string;
  change: string;
  trendUp: boolean;
  icon: string;
  color: string;
}

interface GrowthPoint {
  month: string;
  students: number;
  newAdmissions: number;
}

interface AcademicTrend {
  subject: string;
  score: number;
  previous: number;
  color: string;
}

interface HeatmapCell {
  day: string;
  week: number;
  value: number;
}

interface FinancialPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface TeacherPerf {
  name: string;
  department: string;
  score: number;
  students: number;
}

interface ReportItem {
  name: string;
  category: string;
  generated: string;
  format: string;
  size: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  academicYears = ['2025-26', '2024-25', '2023-24'];
  departments = ['All Departments', 'Academics', 'Administration', 'Accounts', 'Transport', 'HR'];
  classes = ['All Classes', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

  selectedYear = '2025-26';
  selectedDepartment = 'All Departments';
  selectedClass = 'All Classes';
  dateFrom = '2025-07-01';
  dateTo = '2026-06-08';

  kpiCards: ReportKpi[] = [
    { title: 'Reports Generated', value: '248', subtitle: 'This academic year', change: '+32 this month', trendUp: true, icon: 'reports', color: 'purple' },
    { title: 'Academic Performance', value: '87.4%', subtitle: 'School-wide average score', change: '+3.2%', trendUp: true, icon: 'academic', color: 'success' },
    { title: 'Attendance Analytics', value: '94.2%', subtitle: 'Combined student & staff', change: '+1.8%', trendUp: true, icon: 'attendance', color: 'info' },
    { title: 'Revenue Analytics', value: '₹4.85 Cr', subtitle: 'Total collections YTD', change: '+12.4%', trendUp: true, icon: 'revenue', color: 'warning' }
  ];

  studentGrowth: GrowthPoint[] = [
    { month: 'Jul', students: 4580, newAdmissions: 120 },
    { month: 'Aug', students: 4620, newAdmissions: 85 },
    { month: 'Sep', students: 4680, newAdmissions: 95 },
    { month: 'Oct', students: 4710, newAdmissions: 62 },
    { month: 'Nov', students: 4735, newAdmissions: 48 },
    { month: 'Dec', students: 4750, newAdmissions: 35 },
    { month: 'Jan', students: 4780, newAdmissions: 72 },
    { month: 'Feb', students: 4800, newAdmissions: 55 },
    { month: 'Mar', students: 4820, newAdmissions: 42 },
    { month: 'Apr', students: 4835, newAdmissions: 38 },
    { month: 'May', students: 4845, newAdmissions: 28 },
    { month: 'Jun', students: 4850, newAdmissions: 22 }
  ];

  academicTrends: AcademicTrend[] = [
    { subject: 'Mathematics', score: 82, previous: 78, color: '#8B5CF6' },
    { subject: 'Science', score: 85, previous: 81, color: '#7C3AED' },
    { subject: 'English', score: 88, previous: 86, color: '#A78BFA' },
    { subject: 'Hindi', score: 90, previous: 88, color: '#6D28D9' },
    { subject: 'Social Studies', score: 84, previous: 82, color: '#3B82F6' },
    { subject: 'Computer Science', score: 91, previous: 87, color: '#22C55E' }
  ];

  heatmapDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  heatmapWeeks = [1, 2, 3, 4, 5, 6];

  heatmapData: HeatmapCell[] = [
    { day: 'Mon', week: 1, value: 94 }, { day: 'Tue', week: 1, value: 96 }, { day: 'Wed', week: 1, value: 93 },
    { day: 'Thu', week: 1, value: 95 }, { day: 'Fri', week: 1, value: 92 }, { day: 'Sat', week: 1, value: 88 },
    { day: 'Mon', week: 2, value: 95 }, { day: 'Tue', week: 2, value: 97 }, { day: 'Wed', week: 2, value: 94 },
    { day: 'Thu', week: 2, value: 96 }, { day: 'Fri', week: 2, value: 93 }, { day: 'Sat', week: 2, value: 90 },
    { day: 'Mon', week: 3, value: 93 }, { day: 'Tue', week: 3, value: 95 }, { day: 'Wed', week: 3, value: 92 },
    { day: 'Thu', week: 3, value: 94 }, { day: 'Fri', week: 3, value: 91 }, { day: 'Sat', week: 3, value: 87 },
    { day: 'Mon', week: 4, value: 96 }, { day: 'Tue', week: 4, value: 98 }, { day: 'Wed', week: 4, value: 95 },
    { day: 'Thu', week: 4, value: 97 }, { day: 'Fri', week: 4, value: 94 }, { day: 'Sat', week: 4, value: 91 },
    { day: 'Mon', week: 5, value: 94 }, { day: 'Tue', week: 5, value: 96 }, { day: 'Wed', week: 5, value: 93 },
    { day: 'Thu', week: 5, value: 95 }, { day: 'Fri', week: 5, value: 92 }, { day: 'Sat', week: 5, value: 89 },
    { day: 'Mon', week: 6, value: 95 }, { day: 'Tue', week: 6, value: 97 }, { day: 'Wed', week: 6, value: 94 },
    { day: 'Thu', week: 6, value: 96 }, { day: 'Fri', week: 6, value: 93 }, { day: 'Sat', week: 6, value: 90 }
  ];

  financialPerformance: FinancialPoint[] = [
    { month: 'Jul', revenue: 38, expenses: 10, profit: 28 },
    { month: 'Aug', revenue: 42, expenses: 11, profit: 31 },
    { month: 'Sep', revenue: 45, expenses: 10, profit: 35 },
    { month: 'Oct', revenue: 48, expenses: 11, profit: 37 },
    { month: 'Nov', revenue: 44, expenses: 10, profit: 34 },
    { month: 'Dec', revenue: 52, expenses: 12, profit: 40 },
    { month: 'Jan', revenue: 55, expenses: 11, profit: 44 },
    { month: 'Feb', revenue: 50, expenses: 10, profit: 40 },
    { month: 'Mar', revenue: 58, expenses: 12, profit: 46 },
    { month: 'Apr', revenue: 62, expenses: 11, profit: 51 },
    { month: 'May', revenue: 60, expenses: 10, profit: 50 },
    { month: 'Jun', revenue: 65, expenses: 11, profit: 54 }
  ];

  teacherPerformance: TeacherPerf[] = [
    { name: 'Dr. Sunita Rao', department: 'Science', score: 96, students: 142 },
    { name: 'Rajesh Kumar', department: 'Mathematics', score: 94, students: 128 },
    { name: 'Anita Verma', department: 'Languages', score: 91, students: 156 },
    { name: 'Arun Desai', department: 'IT', score: 92, students: 98 },
    { name: 'Priya Sharma', department: 'Science', score: 89, students: 112 },
    { name: 'Vikram Singh', department: 'Social Studies', score: 85, students: 94 }
  ];

  recentReports: ReportItem[] = [
    { name: 'Monthly Academic Performance Report', category: 'Academic', generated: 'Jun 8, 2026', format: 'PDF', size: '2.4 MB' },
    { name: 'Fee Collection Summary — June', category: 'Finance', generated: 'Jun 7, 2026', format: 'Excel', size: '856 KB' },
    { name: 'Staff Attendance Report — May', category: 'HR', generated: 'Jun 5, 2026', format: 'PDF', size: '1.2 MB' },
    { name: 'Class-wise Attendance Analysis', category: 'Attendance', generated: 'Jun 4, 2026', format: 'CSV', size: '124 KB' },
    { name: 'Admission Pipeline Report Q2', category: 'Admissions', generated: 'Jun 3, 2026', format: 'PDF', size: '1.8 MB' },
    { name: 'Teacher Performance Review', category: 'Academic', generated: 'Jun 1, 2026', format: 'Excel', size: '640 KB' }
  ];

  get maxStudents(): number {
    return Math.max(...this.studentGrowth.map(g => g.students));
  }

  get maxFinancial(): number {
    return Math.max(...this.financialPerformance.map(f => f.revenue));
  }

  getGrowthPath(): string {
    const min = 4500;
    const max = this.maxStudents;
    const range = max - min || 1;
    const points = this.studentGrowth.map((g, i) => {
      const x = (i / (this.studentGrowth.length - 1)) * 100;
      const y = 70 - ((g.students - min) / range) * 60;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  }

  getGrowthArea(): string {
    return `${this.getGrowthPath()} L 100,70 L 0,70 Z`;
  }

  getHeatmapValue(day: string, week: number): number {
    const cell = this.heatmapData.find(h => h.day === day && h.week === week);
    return cell?.value ?? 0;
  }

  getHeatmapColor(value: number): string {
    if (value >= 97) return '#7C3AED';
    if (value >= 95) return '#8B5CF6';
    if (value >= 93) return '#A78BFA';
    if (value >= 91) return '#C4B5FD';
    if (value >= 89) return '#DDD6FE';
    return '#EDE9FE';
  }

  getScoreChange(current: number, previous: number): number {
    return current - previous;
  }

  exportReport(_format: 'PDF' | 'Excel' | 'CSV'): void {
    // Export handler — wire to backend download service
  }
}
