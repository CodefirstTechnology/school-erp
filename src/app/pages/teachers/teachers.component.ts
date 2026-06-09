import { Component } from '@angular/core';

interface TeacherKpi {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
}

interface ClassAssignment {
  class: string;
  section: string;
  subject: string;
  periods: number;
}

interface AttendanceRecord {
  month: string;
  present: number;
  total: number;
}

interface PerformanceMetric {
  label: string;
  score: number;
}

interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  subject: string;
  secondarySubject?: string;
  experience: number;
  qualification: string;
  contact: string;
  email: string;
  status: 'active' | 'on-leave' | 'inactive';
  department: string;
  joinDate: string;
  performance: number;
  attendance: number;
  workload: number;
  isExpert: boolean;
  classes: ClassAssignment[];
  attendanceHistory: AttendanceRecord[];
  performanceMetrics: PerformanceMetric[];
}

interface WorkloadItem {
  department: string;
  teachers: number;
  avgPeriods: number;
  color: string;
}

interface SubjectAllocation {
  subject: string;
  teachers: number;
  classes: number;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {
  departments = ['All Departments', 'Science', 'Mathematics', 'Languages', 'Social Studies', 'Arts & PE'];
  subjects = ['All Subjects', 'Mathematics', 'Physics', 'Chemistry', 'English', 'Hindi', 'Biology', 'History', 'Computer Science'];
  statuses = ['All Status', 'Active', 'On Leave', 'Inactive'];

  selectedDepartment = 'All Departments';
  selectedSubject = 'All Subjects';
  selectedStatus = 'All Status';
  searchQuery = '';

  showProfile = false;
  selectedTeacher: Teacher | null = null;
  profileTab: 'overview' | 'classes' | 'attendance' | 'performance' = 'overview';

  kpiCards: TeacherKpi[] = [
    { title: 'Total Teachers', value: '320', subtitle: 'Across all departments', icon: 'total', color: 'purple' },
    { title: 'Active Teachers', value: '287', subtitle: '89.7% present today', icon: 'active', color: 'success' },
    { title: 'Subject Experts', value: '48', subtitle: 'Senior & specialist faculty', icon: 'expert', color: 'info' },
    { title: 'Leave Requests', value: '12', subtitle: '3 pending approval', icon: 'leave', color: 'warning' }
  ];

  workloadDistribution: WorkloadItem[] = [
    { department: 'Science', teachers: 68, avgPeriods: 24, color: '#8B5CF6' },
    { department: 'Mathematics', teachers: 42, avgPeriods: 26, color: '#7C3AED' },
    { department: 'Languages', teachers: 56, avgPeriods: 22, color: '#A78BFA' },
    { department: 'Social Studies', teachers: 38, avgPeriods: 20, color: '#6D28D9' },
    { department: 'Arts & PE', teachers: 34, avgPeriods: 18, color: '#3B82F6' }
  ];

  subjectAllocation: SubjectAllocation[] = [
    { subject: 'Mathematics', teachers: 42, classes: 48, percentage: 92, color: '#8B5CF6' },
    { subject: 'Physics', teachers: 18, classes: 24, percentage: 75, color: '#7C3AED' },
    { subject: 'Chemistry', teachers: 16, classes: 22, percentage: 73, color: '#A78BFA' },
    { subject: 'English', teachers: 32, classes: 52, percentage: 88, color: '#6D28D9' },
    { subject: 'Biology', teachers: 14, classes: 20, percentage: 70, color: '#3B82F6' },
    { subject: 'Computer Science', teachers: 12, classes: 18, percentage: 67, color: '#22C55E' }
  ];

  teachers: Teacher[] = [
    {
      id: '1', employeeId: 'EMP-T-0241', name: 'Dr. Sunita Rao', subject: 'Physics',
      secondarySubject: 'Mathematics', experience: 18, qualification: 'Ph.D. Physics, M.Sc.',
      contact: '+91 98765 44001', email: 'sunita.rao@greenwood.edu', status: 'active',
      department: 'Science', joinDate: 'Jun 2008', performance: 96, attendance: 98, workload: 28,
      isExpert: true,
      classes: [
        { class: 'Class 11', section: 'A', subject: 'Physics', periods: 8 },
        { class: 'Class 12', section: 'A', subject: 'Physics', periods: 10 },
        { class: 'Class 11', section: 'B', subject: 'Physics', periods: 8 }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 22, total: 23 }, { month: 'Feb', present: 20, total: 21 },
        { month: 'Mar', present: 24, total: 24 }, { month: 'Apr', present: 21, total: 22 }
      ],
      performanceMetrics: [
        { label: 'Student Feedback', score: 4.8 }, { label: 'Lesson Completion', score: 98 },
        { label: 'Exam Results', score: 92 }, { label: 'Punctuality', score: 99 }
      ]
    },
    {
      id: '2', employeeId: 'EMP-T-0240', name: 'Anita Verma', subject: 'English',
      experience: 12, qualification: 'M.A. English, B.Ed.',
      contact: '+91 98765 44002', email: 'anita.verma@greenwood.edu', status: 'active',
      department: 'Languages', joinDate: 'Apr 2014', performance: 91, attendance: 95, workload: 24,
      isExpert: true,
      classes: [
        { class: 'Class 9', section: 'A', subject: 'English', periods: 6 },
        { class: 'Class 10', section: 'A', subject: 'English', periods: 6 },
        { class: 'Class 10', section: 'B', subject: 'English', periods: 6 }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 21, total: 23 }, { month: 'Feb', present: 19, total: 21 },
        { month: 'Mar', present: 23, total: 24 }, { month: 'Apr', present: 20, total: 22 }
      ],
      performanceMetrics: [
        { label: 'Student Feedback', score: 4.6 }, { label: 'Lesson Completion', score: 94 },
        { label: 'Exam Results', score: 88 }, { label: 'Punctuality', score: 96 }
      ]
    },
    {
      id: '3', employeeId: 'EMP-T-0239', name: 'Rajesh Kumar', subject: 'Mathematics',
      experience: 15, qualification: 'M.Sc. Mathematics, B.Ed.',
      contact: '+91 98765 44003', email: 'rajesh.kumar@greenwood.edu', status: 'active',
      department: 'Mathematics', joinDate: 'Jul 2011', performance: 94, attendance: 97, workload: 30,
      isExpert: true,
      classes: [
        { class: 'Class 10', section: 'A', subject: 'Mathematics', periods: 8 },
        { class: 'Class 12', section: 'A', subject: 'Mathematics', periods: 10 }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 22, total: 23 }, { month: 'Feb', present: 20, total: 21 },
        { month: 'Mar', present: 24, total: 24 }, { month: 'Apr', present: 22, total: 22 }
      ],
      performanceMetrics: [
        { label: 'Student Feedback', score: 4.7 }, { label: 'Lesson Completion', score: 96 },
        { label: 'Exam Results', score: 95 }, { label: 'Punctuality', score: 98 }
      ]
    },
    {
      id: '4', employeeId: 'EMP-T-0238', name: 'Meera Patel', subject: 'Chemistry',
      experience: 8, qualification: 'M.Sc. Chemistry, B.Ed.',
      contact: '+91 98765 44004', email: 'meera.patel@greenwood.edu', status: 'on-leave',
      department: 'Science', joinDate: 'Jun 2018', performance: 88, attendance: 91, workload: 22,
      isExpert: false,
      classes: [
        { class: 'Class 11', section: 'B', subject: 'Chemistry', periods: 8 },
        { class: 'Class 12', section: 'B', subject: 'Chemistry', periods: 8 }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 20, total: 23 }, { month: 'Feb', present: 18, total: 21 },
        { month: 'Mar', present: 22, total: 24 }, { month: 'Apr', present: 15, total: 22 }
      ],
      performanceMetrics: [
        { label: 'Student Feedback', score: 4.4 }, { label: 'Lesson Completion', score: 90 },
        { label: 'Exam Results', score: 86 }, { label: 'Punctuality', score: 92 }
      ]
    },
    {
      id: '5', employeeId: 'EMP-T-0237', name: 'Vikram Singh', subject: 'History',
      experience: 10, qualification: 'M.A. History, B.Ed.',
      contact: '+91 98765 44005', email: 'vikram.singh@greenwood.edu', status: 'active',
      department: 'Social Studies', joinDate: 'Apr 2016', performance: 85, attendance: 93, workload: 20,
      isExpert: false,
      classes: [
        { class: 'Class 8', section: 'A', subject: 'History', periods: 5 },
        { class: 'Class 9', section: 'B', subject: 'History', periods: 5 }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 21, total: 23 }, { month: 'Feb', present: 19, total: 21 },
        { month: 'Mar', present: 22, total: 24 }, { month: 'Apr', present: 20, total: 22 }
      ],
      performanceMetrics: [
        { label: 'Student Feedback', score: 4.3 }, { label: 'Lesson Completion', score: 88 },
        { label: 'Exam Results', score: 82 }, { label: 'Punctuality', score: 94 }
      ]
    },
    {
      id: '6', employeeId: 'EMP-T-0236', name: 'Priya Sharma', subject: 'Biology',
      experience: 6, qualification: 'M.Sc. Biology, B.Ed.',
      contact: '+91 98765 44006', email: 'priya.sharma@greenwood.edu', status: 'active',
      department: 'Science', joinDate: 'Jun 2020', performance: 89, attendance: 96, workload: 24,
      isExpert: false,
      classes: [
        { class: 'Class 10', section: 'B', subject: 'Biology', periods: 6 },
        { class: 'Class 11', section: 'A', subject: 'Biology', periods: 8 }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 22, total: 23 }, { month: 'Feb', present: 20, total: 21 },
        { month: 'Mar', present: 23, total: 24 }, { month: 'Apr', present: 21, total: 22 }
      ],
      performanceMetrics: [
        { label: 'Student Feedback', score: 4.5 }, { label: 'Lesson Completion', score: 92 },
        { label: 'Exam Results', score: 87 }, { label: 'Punctuality', score: 97 }
      ]
    },
    {
      id: '7', employeeId: 'EMP-T-0235', name: 'Arun Desai', subject: 'Computer Science',
      experience: 9, qualification: 'M.Tech. CSE, B.Ed.',
      contact: '+91 98765 44007', email: 'arun.desai@greenwood.edu', status: 'active',
      department: 'Science', joinDate: 'Aug 2017', performance: 92, attendance: 94, workload: 26,
      isExpert: true,
      classes: [
        { class: 'Class 9', section: 'A', subject: 'Computer Science', periods: 4 },
        { class: 'Class 10', section: 'A', subject: 'Computer Science', periods: 4 },
        { class: 'Class 11', section: 'A', subject: 'Computer Science', periods: 6 }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 21, total: 23 }, { month: 'Feb', present: 19, total: 21 },
        { month: 'Mar', present: 23, total: 24 }, { month: 'Apr', present: 20, total: 22 }
      ],
      performanceMetrics: [
        { label: 'Student Feedback', score: 4.6 }, { label: 'Lesson Completion', score: 95 },
        { label: 'Exam Results', score: 90 }, { label: 'Punctuality', score: 93 }
      ]
    },
    {
      id: '8', employeeId: 'EMP-T-0234', name: 'Kavita Menon', subject: 'Hindi',
      experience: 14, qualification: 'M.A. Hindi, B.Ed.',
      contact: '+91 98765 44008', email: 'kavita.menon@greenwood.edu', status: 'inactive',
      department: 'Languages', joinDate: 'Jun 2012', performance: 78, attendance: 85, workload: 18,
      isExpert: false,
      classes: [{ class: 'Class 7', section: 'C', subject: 'Hindi', periods: 5 }],
      attendanceHistory: [
        { month: 'Jan', present: 18, total: 23 }, { month: 'Feb', present: 16, total: 21 },
        { month: 'Mar', present: 20, total: 24 }, { month: 'Apr', present: 17, total: 22 }
      ],
      performanceMetrics: [
        { label: 'Student Feedback', score: 3.9 }, { label: 'Lesson Completion', score: 80 },
        { label: 'Exam Results', score: 75 }, { label: 'Punctuality', score: 88 }
      ]
    }
  ];

  get filteredTeachers(): Teacher[] {
    return this.teachers.filter(t => {
      const matchDept = this.selectedDepartment === 'All Departments' || t.department === this.selectedDepartment;
      const matchSubject = this.selectedSubject === 'All Subjects' || t.subject === this.selectedSubject;
      const matchStatus = this.selectedStatus === 'All Status' ||
        t.status === this.selectedStatus.toLowerCase().replace(' ', '-');
      const matchSearch = !this.searchQuery ||
        t.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.employeeId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchDept && matchSubject && matchStatus && matchSearch;
    });
  }

  get maxWorkload(): number {
    return Math.max(...this.workloadDistribution.map(w => w.avgPeriods));
  }

  getPerformanceClass(score: number): string {
    if (score >= 90) return 'high';
    if (score >= 80) return 'medium';
    return 'low';
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      active: 'status-active',
      'on-leave': 'status-leave',
      inactive: 'status-inactive'
    };
    return map[status] || '';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      active: 'Active',
      'on-leave': 'On Leave',
      inactive: 'Inactive'
    };
    return map[status] || status;
  }

  viewProfile(teacher: Teacher): void {
    this.selectedTeacher = teacher;
    this.profileTab = 'overview';
    this.showProfile = false;
    setTimeout(() => this.showProfile = true, 20);
  }

  closeProfile(): void {
    this.showProfile = false;
    setTimeout(() => { this.selectedTeacher = null; }, 350);
  }

  setProfileTab(tab: 'overview' | 'classes' | 'attendance' | 'performance'): void {
    this.profileTab = tab;
  }

  getAvatarUrl(name: string): string {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=ddd6fe`;
  }
}
