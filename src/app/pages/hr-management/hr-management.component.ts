import { Component } from '@angular/core';

type HrModule = 'employees' | 'leave' | 'attendance' | 'payroll' | 'recruitment';

interface HrKpi {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
}

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'on-leave' | 'inactive';
  attendance: number;
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  month: string;
  basic: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: 'processed' | 'pending' | 'on-hold';
}

interface Recruitment {
  id: string;
  position: string;
  department: string;
  openings: number;
  applicants: number;
  shortlisted: number;
  status: 'open' | 'interviewing' | 'closed';
  postedDate: string;
}

interface DepartmentStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface PayrollTrend {
  month: string;
  amount: number;
}

@Component({
  selector: 'app-hr-management',
  templateUrl: './hr-management.component.html',
  styleUrls: ['./hr-management.component.css']
})
export class HrManagementComponent {
  activeModule: HrModule = 'employees';
  searchQuery = '';
  selectedDepartment = 'All Departments';

  departments = ['All Departments', 'Administration', 'Academics', 'Accounts', 'Transport', 'IT', 'Support Staff'];

  modules: { id: HrModule; label: string; icon: string; count?: number }[] = [
    { id: 'employees', label: 'Employee Management', icon: 'employees', count: 385 },
    { id: 'leave', label: 'Leave Management', icon: 'leave', count: 18 },
    { id: 'attendance', label: 'Attendance Tracking', icon: 'attendance' },
    { id: 'payroll', label: 'Payroll Management', icon: 'payroll' },
    { id: 'recruitment', label: 'Recruitment', icon: 'recruitment', count: 6 }
  ];

  kpiCards: HrKpi[] = [
    { title: 'Total Employees', value: '385', subtitle: 'Full-time & contract staff', icon: 'total', color: 'purple' },
    { title: 'Present Today', value: '352', subtitle: '91.4% attendance rate', icon: 'present', color: 'success' },
    { title: 'Leave Requests', value: '18', subtitle: '7 pending approval', icon: 'leave', color: 'warning' },
    { title: 'Payroll Processed', value: '₹1.2 Cr', subtitle: 'June 2026 salary cycle', icon: 'payroll', color: 'info' }
  ];

  attendanceChart = [
    { day: 'Mon', present: 368, absent: 17 },
    { day: 'Tue', present: 372, absent: 13 },
    { day: 'Wed', present: 365, absent: 20 },
    { day: 'Thu', present: 378, absent: 7 },
    { day: 'Fri', present: 352, absent: 33 },
    { day: 'Sat', present: 210, absent: 8 }
  ];

  departmentStats: DepartmentStat[] = [
    { name: 'Academics', count: 168, percentage: 44, color: '#8B5CF6' },
    { name: 'Administration', count: 62, percentage: 16, color: '#7C3AED' },
    { name: 'Support Staff', count: 58, percentage: 15, color: '#A78BFA' },
    { name: 'Accounts', count: 32, percentage: 8, color: '#6D28D9' },
    { name: 'Transport', count: 28, percentage: 7, color: '#3B82F6' },
    { name: 'IT', count: 22, percentage: 6, color: '#22C55E' },
    { name: 'Others', count: 15, percentage: 4, color: '#94A3B8' }
  ];

  payrollTrends: PayrollTrend[] = [
    { month: 'Jan', amount: 108 },
    { month: 'Feb', amount: 112 },
    { month: 'Mar', amount: 115 },
    { month: 'Apr', amount: 118 },
    { month: 'May', amount: 120 },
    { month: 'Jun', amount: 122 }
  ];

  employees: Employee[] = [
    { id: '1', employeeId: 'EMP-001', name: 'Rajesh Kumar', department: 'Administration', designation: 'School Administrator', email: 'rajesh.k@greenwood.edu', phone: '+91 98765 10001', joinDate: 'Jan 2015', status: 'active', attendance: 98 },
    { id: '2', employeeId: 'EMP-002', name: 'Dr. Sunita Rao', department: 'Academics', designation: 'Senior Teacher', email: 'sunita.r@greenwood.edu', phone: '+91 98765 10002', joinDate: 'Jun 2008', status: 'active', attendance: 97 },
    { id: '3', employeeId: 'EMP-003', name: 'Arun Desai', department: 'Accounts', designation: 'Accounts Manager', email: 'arun.d@greenwood.edu', phone: '+91 98765 10003', joinDate: 'Mar 2012', status: 'active', attendance: 96 },
    { id: '4', employeeId: 'EMP-004', name: 'Meera Patel', department: 'Academics', designation: 'Teacher', email: 'meera.p@greenwood.edu', phone: '+91 98765 10004', joinDate: 'Jun 2018', status: 'on-leave', attendance: 88 },
    { id: '5', employeeId: 'EMP-005', name: 'Vikram Singh', department: 'Transport', designation: 'Transport Supervisor', email: 'vikram.s@greenwood.edu', phone: '+91 98765 10005', joinDate: 'Aug 2016', status: 'active', attendance: 94 },
    { id: '6', employeeId: 'EMP-006', name: 'Priya Sharma', department: 'IT', designation: 'IT Administrator', email: 'priya.s@greenwood.edu', phone: '+91 98765 10006', joinDate: 'Apr 2020', status: 'active', attendance: 99 },
    { id: '7', employeeId: 'EMP-007', name: 'Kavita Menon', department: 'Support Staff', designation: 'Librarian', email: 'kavita.m@greenwood.edu', phone: '+91 98765 10007', joinDate: 'Jun 2012', status: 'active', attendance: 95 },
    { id: '8', employeeId: 'EMP-008', name: 'Rohit Verma', department: 'Support Staff', designation: 'Lab Assistant', email: 'rohit.v@greenwood.edu', phone: '+91 98765 10008', joinDate: 'Sep 2019', status: 'inactive', attendance: 72 }
  ];

  leaveRequests: LeaveRequest[] = [
    { id: '1', employeeId: 'EMP-004', employeeName: 'Meera Patel', department: 'Academics', leaveType: 'Medical Leave', fromDate: 'Jun 5, 2026', toDate: 'Jun 10, 2026', days: 5, reason: 'Medical treatment', status: 'pending' },
    { id: '2', employeeId: 'EMP-012', employeeName: 'Anita Verma', department: 'Academics', leaveType: 'Casual Leave', fromDate: 'Jun 12, 2026', toDate: 'Jun 13, 2026', days: 2, reason: 'Personal work', status: 'pending' },
    { id: '3', employeeId: 'EMP-018', employeeName: 'Deepa Mehta', department: 'Administration', leaveType: 'Earned Leave', fromDate: 'Jun 1, 2026', toDate: 'Jun 3, 2026', days: 3, reason: 'Family function', status: 'approved' },
    { id: '4', employeeId: 'EMP-025', employeeName: 'Suresh Reddy', department: 'Transport', leaveType: 'Casual Leave', fromDate: 'Jun 8, 2026', toDate: 'Jun 8, 2026', days: 1, reason: 'Urgent personal matter', status: 'approved' },
    { id: '5', employeeId: 'EMP-031', employeeName: 'Lakshmi Nair', department: 'Accounts', leaveType: 'Maternity Leave', fromDate: 'May 15, 2026', toDate: 'Aug 15, 2026', days: 90, reason: 'Maternity', status: 'approved' },
    { id: '6', employeeId: 'EMP-042', employeeName: 'Amit Gupta', department: 'Support Staff', leaveType: 'Casual Leave', fromDate: 'Jun 15, 2026', toDate: 'Jun 16, 2026', days: 2, reason: 'Travel', status: 'pending' }
  ];

  payrollRecords: PayrollRecord[] = [
    { id: '1', employeeId: 'EMP-001', employeeName: 'Rajesh Kumar', department: 'Administration', month: 'June 2026', basic: 85000, allowances: 15000, deductions: 8500, netPay: 91500, status: 'processed' },
    { id: '2', employeeId: 'EMP-002', employeeName: 'Dr. Sunita Rao', department: 'Academics', month: 'June 2026', basic: 72000, allowances: 12000, deductions: 7200, netPay: 76800, status: 'processed' },
    { id: '3', employeeId: 'EMP-003', employeeName: 'Arun Desai', department: 'Accounts', month: 'June 2026', basic: 65000, allowances: 10000, deductions: 6500, netPay: 68500, status: 'processed' },
    { id: '4', employeeId: 'EMP-004', employeeName: 'Meera Patel', department: 'Academics', month: 'June 2026', basic: 48000, allowances: 8000, deductions: 4800, netPay: 51200, status: 'on-hold' },
    { id: '5', employeeId: 'EMP-005', employeeName: 'Vikram Singh', department: 'Transport', month: 'June 2026', basic: 38000, allowances: 6000, deductions: 3800, netPay: 40200, status: 'processed' },
    { id: '6', employeeId: 'EMP-006', employeeName: 'Priya Sharma', department: 'IT', month: 'June 2026', basic: 55000, allowances: 9000, deductions: 5500, netPay: 58500, status: 'pending' }
  ];

  recruitments: Recruitment[] = [
    { id: '1', position: 'Mathematics Teacher', department: 'Academics', openings: 2, applicants: 45, shortlisted: 8, status: 'interviewing', postedDate: 'May 20, 2026' },
    { id: '2', position: 'Lab Assistant — Chemistry', department: 'Academics', openings: 1, applicants: 22, shortlisted: 5, status: 'interviewing', postedDate: 'May 28, 2026' },
    { id: '3', position: 'Accountant', department: 'Accounts', openings: 1, applicants: 38, shortlisted: 6, status: 'open', postedDate: 'Jun 1, 2026' },
    { id: '4', position: 'Bus Driver', department: 'Transport', openings: 3, applicants: 15, shortlisted: 4, status: 'open', postedDate: 'Jun 3, 2026' },
    { id: '5', position: 'School Counselor', department: 'Administration', openings: 1, applicants: 28, shortlisted: 0, status: 'open', postedDate: 'Jun 5, 2026' },
    { id: '6', position: 'PE Teacher', department: 'Academics', openings: 1, applicants: 18, shortlisted: 3, status: 'closed', postedDate: 'Apr 10, 2026' }
  ];

  get maxAttendance(): number {
    return Math.max(...this.attendanceChart.map(d => d.present + d.absent));
  }

  get maxPayroll(): number {
    return Math.max(...this.payrollTrends.map(p => p.amount));
  }

  get filteredEmployees(): Employee[] {
    return this.filterByDept(this.employees.filter(e =>
      !this.searchQuery ||
      e.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      e.employeeId.toLowerCase().includes(this.searchQuery.toLowerCase())
    ));
  }

  get filteredLeaveRequests(): LeaveRequest[] {
    return this.filterByDept(this.leaveRequests.filter(l =>
      !this.searchQuery ||
      l.employeeName.toLowerCase().includes(this.searchQuery.toLowerCase())
    ));
  }

  get filteredPayroll(): PayrollRecord[] {
    return this.filterByDept(this.payrollRecords.filter(p =>
      !this.searchQuery ||
      p.employeeName.toLowerCase().includes(this.searchQuery.toLowerCase())
    ));
  }

  private filterByDept<T extends { department: string }>(items: T[]): T[] {
    if (this.selectedDepartment === 'All Departments') return items;
    return items.filter(i => i.department === this.selectedDepartment);
  }

  setModule(module: HrModule): void {
    this.activeModule = module;
    this.searchQuery = '';
  }

  getAvatarUrl(name: string): string {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=ddd6fe`;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      active: 'status-active', 'on-leave': 'status-leave', inactive: 'status-inactive',
      pending: 'status-pending', approved: 'status-approved', rejected: 'status-rejected',
      processed: 'status-processed', 'on-hold': 'status-hold',
      open: 'status-open', interviewing: 'status-interview', closed: 'status-closed'
    };
    return map[status] || '';
  }

  formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN');
  }

  formatPayrollLakhs(amount: number): string {
    return '₹' + amount + 'L';
  }

  approveLeave(req: LeaveRequest): void {
    req.status = 'approved';
  }

  rejectLeave(req: LeaveRequest): void {
    req.status = 'rejected';
  }
}
