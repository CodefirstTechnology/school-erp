import { Component } from '@angular/core';

interface AdmissionKpi {
  title: string;
  value: string;
  change: string;
  trendUp: boolean;
  icon: string;
  color: string;
}

interface Admission {
  id: string;
  studentName: string;
  applicationId: string;
  classApplied: string;
  parentName: string;
  contact: string;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  source: string;
}

interface FunnelStage {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

interface MonthlyTrend {
  month: string;
  applications: number;
  approved: number;
}

interface SourceAnalytic {
  source: string;
  count: number;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.component.html',
  styleUrls: ['./admissions.component.css']
})
export class AdmissionsComponent {
  academicYears = ['2025-26', '2024-25', '2023-24'];
  classes = ['All Classes', 'Nursery', 'Class 1', 'Class 6', 'Class 9', 'Class 11'];
  statuses = ['All Status', 'Pending', 'Under Review', 'Approved', 'Rejected'];

  selectedYear = '2025-26';
  selectedClass = 'All Classes';
  selectedStatus = 'All Status';
  dateFrom = '2026-01-01';
  dateTo = '2026-06-08';

  kpiCards: AdmissionKpi[] = [
    { title: 'Total Applications', value: '1,248', change: '+18% vs last year', trendUp: true, icon: 'total', color: 'purple' },
    { title: 'Pending Applications', value: '186', change: '42 due this week', trendUp: false, icon: 'pending', color: 'warning' },
    { title: 'Approved Admissions', value: '892', change: '+24% approval rate', trendUp: true, icon: 'approved', color: 'success' },
    { title: 'Rejected Applications', value: '170', change: '13.6% rejection rate', trendUp: false, icon: 'rejected', color: 'danger' }
  ];

  funnelStages: FunnelStage[] = [
    { label: 'Inquiry', count: 1248, percentage: 100, color: '#A78BFA' },
    { label: 'Application Submitted', count: 1086, percentage: 87, color: '#8B5CF6' },
    { label: 'Document Verification', count: 842, percentage: 67, color: '#7C3AED' },
    { label: 'Interview Scheduled', count: 624, percentage: 50, color: '#6D28D9' },
    { label: 'Approved', count: 892, percentage: 71, color: '#22C55E' }
  ];

  monthlyTrends: MonthlyTrend[] = [
    { month: 'Jan', applications: 142, approved: 98 },
    { month: 'Feb', applications: 168, approved: 112 },
    { month: 'Mar', applications: 195, approved: 138 },
    { month: 'Apr', applications: 210, approved: 156 },
    { month: 'May', applications: 248, approved: 178 },
    { month: 'Jun', applications: 285, approved: 210 }
  ];

  sourceAnalytics: SourceAnalytic[] = [
    { source: 'School Website', count: 412, percentage: 33, color: '#8B5CF6' },
    { source: 'Walk-in Inquiry', count: 298, percentage: 24, color: '#A78BFA' },
    { source: 'Referral', count: 224, percentage: 18, color: '#7C3AED' },
    { source: 'Social Media', count: 186, percentage: 15, color: '#3B82F6' },
    { source: 'Education Fair', count: 128, percentage: 10, color: '#22C55E' }
  ];

  admissions: Admission[] = [
    { id: '1', studentName: 'Aarav Sharma', applicationId: 'ADM-2026-1042', classApplied: 'Class 6', parentName: 'Rohit Sharma', contact: '+91 98765 43210', applicationDate: 'Jun 8, 2026', status: 'pending', source: 'School Website' },
    { id: '2', studentName: 'Priya Nair', applicationId: 'ADM-2026-1041', classApplied: 'Class 9', parentName: 'Lakshmi Nair', contact: '+91 98765 43211', applicationDate: 'Jun 7, 2026', status: 'under-review', source: 'Referral' },
    { id: '3', studentName: 'Vihaan Patel', applicationId: 'ADM-2026-1040', classApplied: 'Nursery', parentName: 'Kiran Patel', contact: '+91 98765 43212', applicationDate: 'Jun 7, 2026', status: 'approved', source: 'Walk-in Inquiry' },
    { id: '4', studentName: 'Ananya Reddy', applicationId: 'ADM-2026-1039', classApplied: 'Class 11', parentName: 'Suresh Reddy', contact: '+91 98765 43213', applicationDate: 'Jun 6, 2026', status: 'approved', source: 'Education Fair' },
    { id: '5', studentName: 'Arjun Mehta', applicationId: 'ADM-2026-1038', classApplied: 'Class 1', parentName: 'Deepa Mehta', contact: '+91 98765 43214', applicationDate: 'Jun 6, 2026', status: 'rejected', source: 'Social Media' },
    { id: '6', studentName: 'Ishita Gupta', applicationId: 'ADM-2026-1037', classApplied: 'Class 6', parentName: 'Amit Gupta', contact: '+91 98765 43215', applicationDate: 'Jun 5, 2026', status: 'pending', source: 'School Website' },
    { id: '7', studentName: 'Rohan Das', applicationId: 'ADM-2026-1036', classApplied: 'Class 9', parentName: 'Pallavi Das', contact: '+91 98765 43216', applicationDate: 'Jun 5, 2026', status: 'under-review', source: 'Referral' },
    { id: '8', studentName: 'Saanvi Iyer', applicationId: 'ADM-2026-1035', classApplied: 'Class 11', parentName: 'Vikram Iyer', contact: '+91 98765 43217', applicationDate: 'Jun 4, 2026', status: 'approved', source: 'School Website' }
  ];

  filteredAdmissions: Admission[] = [...this.admissions];

  get maxMonthly(): number {
    return Math.max(...this.monthlyTrends.map(m => m.applications));
  }

  applyFilters(): void {
    this.filteredAdmissions = this.admissions.filter(a => {
      const matchClass = this.selectedClass === 'All Classes' || a.classApplied === this.selectedClass;
      const matchStatus = this.selectedStatus === 'All Status' ||
        a.status === this.selectedStatus.toLowerCase().replace(' ', '-');
      return matchClass && matchStatus;
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      pending: 'status-pending',
      approved: 'status-approved',
      rejected: 'status-rejected',
      'under-review': 'status-review'
    };
    return map[status] || '';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      'under-review': 'Under Review'
    };
    return map[status] || status;
  }

  approveApplication(admission: Admission): void {
    admission.status = 'approved';
    this.applyFilters();
  }

  rejectApplication(admission: Admission): void {
    admission.status = 'rejected';
    this.applyFilters();
  }
}
