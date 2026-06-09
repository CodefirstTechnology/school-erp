import { Component } from '@angular/core';

type FinanceModule = 'fees' | 'expenses' | 'salary' | 'invoices' | 'reports';

interface FinanceKpi {
  title: string;
  value: string;
  subtitle: string;
  change?: string;
  trendUp?: boolean;
  icon: string;
  color: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'credit' | 'debit';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

interface PendingPayment {
  id: string;
  studentName: string;
  class: string;
  parentName: string;
  feeType: string;
  amount: number;
  dueDate: string;
  overdueDays: number;
  status: 'pending' | 'overdue' | 'partial';
}

interface FeeRecord {
  id: string;
  studentName: string;
  rollNumber: string;
  class: string;
  term: string;
  totalFee: number;
  paid: number;
  balance: number;
  status: 'paid' | 'partial' | 'unpaid';
  lastPayment: string;
}

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  vendor: string;
  amount: number;
  status: 'approved' | 'pending' | 'rejected';
}

interface Invoice {
  id: string;
  invoiceNo: string;
  client: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'sent' | 'overdue' | 'draft';
}

interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent {
  activeModule: FinanceModule = 'fees';
  searchQuery = '';
  selectedPeriod = '2025-26';

  periods = ['2025-26', '2024-25', '2023-24'];

  modules: { id: FinanceModule; label: string; icon: string }[] = [
    { id: 'fees', label: 'Fee Collection', icon: 'fees' },
    { id: 'expenses', label: 'Expense Tracking', icon: 'expenses' },
    { id: 'salary', label: 'Salary Management', icon: 'salary' },
    { id: 'invoices', label: 'Invoice Management', icon: 'invoices' },
    { id: 'reports', label: 'Financial Reports', icon: 'reports' }
  ];

  kpiCards: FinanceKpi[] = [
    { title: 'Total Revenue', value: '₹4.85 Cr', subtitle: 'Academic year 2025-26', change: '+12.4%', trendUp: true, icon: 'revenue', color: 'purple' },
    { title: 'Pending Fees', value: '₹32.4 L', subtitle: '186 accounts outstanding', change: '-8.2%', trendUp: true, icon: 'pending', color: 'warning' },
    { title: 'Collected Fees', value: '₹4.52 Cr', subtitle: '93.2% collection rate', change: '+15.1%', trendUp: true, icon: 'collected', color: 'success' },
    { title: 'Expenses', value: '₹1.28 Cr', subtitle: 'YTD operational costs', change: '+5.3%', trendUp: false, icon: 'expenses', color: 'danger' }
  ];

  revenueTrend = [
    { month: 'Jul', revenue: 38, collection: 35 },
    { month: 'Aug', revenue: 42, collection: 40 },
    { month: 'Sep', revenue: 45, collection: 43 },
    { month: 'Oct', revenue: 48, collection: 46 },
    { month: 'Nov', revenue: 44, collection: 42 },
    { month: 'Dec', revenue: 52, collection: 50 },
    { month: 'Jan', revenue: 55, collection: 52 },
    { month: 'Feb', revenue: 50, collection: 48 },
    { month: 'Mar', revenue: 58, collection: 55 },
    { month: 'Apr', revenue: 62, collection: 58 },
    { month: 'May', revenue: 60, collection: 57 },
    { month: 'Jun', revenue: 65, collection: 62 }
  ];

  monthlyCollection = [
    { month: 'Jan', target: 50, collected: 48 },
    { month: 'Feb', target: 50, collected: 46 },
    { month: 'Mar', target: 55, collected: 52 },
    { month: 'Apr', target: 58, collected: 55 },
    { month: 'May', target: 60, collected: 57 },
    { month: 'Jun', target: 62, collected: 60 }
  ];

  expenseCategories: ExpenseCategory[] = [
    { name: 'Salaries & Wages', amount: 72, percentage: 56, color: '#8B5CF6' },
    { name: 'Infrastructure', amount: 22, percentage: 17, color: '#7C3AED' },
    { name: 'Utilities', amount: 12, percentage: 9, color: '#A78BFA' },
    { name: 'Transport', amount: 10, percentage: 8, color: '#6D28D9' },
    { name: 'Supplies', amount: 8, percentage: 6, color: '#3B82F6' },
    { name: 'Others', amount: 4, percentage: 4, color: '#94A3B8' }
  ];

  profitOverview = {
    revenue: 485,
    expenses: 128,
    profit: 357,
    margin: 73.6
  };

  recentTransactions: Transaction[] = [
    { id: '1', date: 'Jun 8, 2026', description: 'Term 2 Fee — Aarav Sharma', category: 'Fee Collection', type: 'credit', amount: 45000, status: 'completed', reference: 'TXN-2026-8842' },
    { id: '2', date: 'Jun 8, 2026', description: 'Electricity Bill — June', category: 'Utilities', type: 'debit', amount: 85000, status: 'completed', reference: 'TXN-2026-8841' },
    { id: '3', date: 'Jun 7, 2026', description: 'Term 2 Fee — Priya Nair', category: 'Fee Collection', type: 'credit', amount: 42000, status: 'completed', reference: 'TXN-2026-8840' },
    { id: '4', date: 'Jun 7, 2026', description: 'Staff Salary — June', category: 'Salaries', type: 'debit', amount: 1220000, status: 'completed', reference: 'TXN-2026-8839' },
    { id: '5', date: 'Jun 6, 2026', description: 'Transport Fee — Vihaan Patel', category: 'Fee Collection', type: 'credit', amount: 12000, status: 'completed', reference: 'TXN-2026-8838' },
    { id: '6', date: 'Jun 6, 2026', description: 'Lab Equipment Purchase', category: 'Supplies', type: 'debit', amount: 145000, status: 'pending', reference: 'TXN-2026-8837' },
    { id: '7', date: 'Jun 5, 2026', description: 'Admission Fee — New Student', category: 'Fee Collection', type: 'credit', amount: 25000, status: 'completed', reference: 'TXN-2026-8836' },
    { id: '8', date: 'Jun 5, 2026', description: 'Bus Maintenance', category: 'Transport', type: 'debit', amount: 35000, status: 'completed', reference: 'TXN-2026-8835' }
  ];

  pendingPayments: PendingPayment[] = [
    { id: '1', studentName: 'Arjun Mehta', class: 'Class 7-C', parentName: 'Deepa Mehta', feeType: 'Term 2 Fee', amount: 36000, dueDate: 'Jun 1, 2026', overdueDays: 7, status: 'overdue' },
    { id: '2', studentName: 'Saanvi Iyer', class: 'Class 10-B', parentName: 'Vikram Iyer', feeType: 'Term 1 Fee', amount: 45000, dueDate: 'Apr 15, 2026', overdueDays: 54, status: 'overdue' },
    { id: '3', studentName: 'Rohan Das', class: 'Class 12-A', parentName: 'Pallavi Das', feeType: 'Term 2 Fee', amount: 55000, dueDate: 'Jun 15, 2026', overdueDays: 0, status: 'pending' },
    { id: '4', studentName: 'Ishita Gupta', class: 'Class 6-B', parentName: 'Amit Gupta', feeType: 'Transport Fee', amount: 12000, dueDate: 'Jun 10, 2026', overdueDays: 0, status: 'pending' },
    { id: '5', studentName: 'Vihaan Patel', class: 'Class 8-A', parentName: 'Kiran Patel', feeType: 'Term 2 Fee', amount: 19000, dueDate: 'May 20, 2026', overdueDays: 19, status: 'partial' },
    { id: '6', studentName: 'Ananya Reddy', class: 'Class 11-A', parentName: 'Suresh Reddy', feeType: 'Lab Fee', amount: 8000, dueDate: 'Jun 20, 2026', overdueDays: 0, status: 'pending' }
  ];

  feeRecords: FeeRecord[] = [
    { id: '1', studentName: 'Aarav Sharma', rollNumber: 'STU-0842', class: 'Class 10-A', term: 'Term 2 (2025-26)', totalFee: 135000, paid: 135000, balance: 0, status: 'paid', lastPayment: 'Jun 8, 2026' },
    { id: '2', studentName: 'Priya Nair', rollNumber: 'STU-0841', class: 'Class 9-B', term: 'Term 2 (2025-26)', totalFee: 126000, paid: 84000, balance: 42000, status: 'partial', lastPayment: 'Jun 7, 2026' },
    { id: '3', studentName: 'Vihaan Patel', rollNumber: 'STU-0840', class: 'Class 8-A', term: 'Term 2 (2025-26)', totalFee: 114000, paid: 95000, balance: 19000, status: 'partial', lastPayment: 'May 15, 2026' },
    { id: '4', studentName: 'Ananya Reddy', rollNumber: 'STU-0839', class: 'Class 11-A', term: 'Term 2 (2025-26)', totalFee: 156000, paid: 156000, balance: 0, status: 'paid', lastPayment: 'Jun 1, 2026' },
    { id: '5', studentName: 'Arjun Mehta', rollNumber: 'STU-0838', class: 'Class 7-C', term: 'Term 2 (2025-26)', totalFee: 108000, paid: 72000, balance: 36000, status: 'partial', lastPayment: 'Apr 10, 2026' },
    { id: '6', studentName: 'Saanvi Iyer', rollNumber: 'STU-0835', class: 'Class 10-B', term: 'Term 1 (2025-26)', totalFee: 135000, paid: 90000, balance: 45000, status: 'unpaid', lastPayment: 'Aug 20, 2025' }
  ];

  expenses: Expense[] = [
    { id: '1', date: 'Jun 8, 2026', category: 'Utilities', description: 'Electricity Bill — June', vendor: 'State Power Corp', amount: 85000, status: 'approved' },
    { id: '2', date: 'Jun 7, 2026', category: 'Salaries', description: 'Staff Salary — June 2026', vendor: 'Internal Payroll', amount: 1220000, status: 'approved' },
    { id: '3', date: 'Jun 6, 2026', category: 'Supplies', description: 'Lab Equipment Purchase', vendor: 'Science Supplies Co.', amount: 145000, status: 'pending' },
    { id: '4', date: 'Jun 5, 2026', category: 'Transport', description: 'Bus Maintenance & Fuel', vendor: 'Green Transport Ltd', amount: 35000, status: 'approved' },
    { id: '5', date: 'Jun 4, 2026', category: 'Infrastructure', description: 'Classroom AC Repair', vendor: 'CoolAir Services', amount: 28000, status: 'approved' },
    { id: '6', date: 'Jun 3, 2026', category: 'Others', description: 'Annual Day Event Expenses', vendor: 'Event Planners Inc', amount: 95000, status: 'pending' }
  ];

  invoices: Invoice[] = [
    { id: '1', invoiceNo: 'INV-2026-042', client: 'Greenwood PTA', issueDate: 'Jun 1, 2026', dueDate: 'Jun 30, 2026', amount: 250000, status: 'sent' },
    { id: '2', invoiceNo: 'INV-2026-041', client: 'Sports Equipment Vendor', issueDate: 'May 28, 2026', dueDate: 'Jun 15, 2026', amount: 85000, status: 'paid' },
    { id: '3', invoiceNo: 'INV-2026-040', client: 'Catering Services', issueDate: 'May 20, 2026', dueDate: 'Jun 5, 2026', amount: 120000, status: 'overdue' },
    { id: '4', invoiceNo: 'INV-2026-039', client: 'IT Support Contract', issueDate: 'May 15, 2026', dueDate: 'Jun 15, 2026', amount: 45000, status: 'sent' },
    { id: '5', invoiceNo: 'INV-2026-038', client: 'Library Book Supplier', issueDate: 'May 10, 2026', dueDate: 'Jun 10, 2026', amount: 68000, status: 'paid' }
  ];

  salaryRecords = [
    { department: 'Academics', employees: 168, total: 68.5, processed: 165, pending: 3 },
    { department: 'Administration', employees: 62, total: 28.2, processed: 62, pending: 0 },
    { department: 'Support Staff', employees: 58, total: 14.8, processed: 56, pending: 2 },
    { department: 'Transport', employees: 28, total: 6.5, processed: 28, pending: 0 },
    { department: 'IT', employees: 22, total: 4.0, processed: 22, pending: 0 }
  ];

  get maxRevenue(): number {
    return Math.max(...this.revenueTrend.map(r => r.revenue));
  }

  get maxCollection(): number {
    return Math.max(...this.monthlyCollection.map(m => Math.max(m.target, m.collected)));
  }

  getRevenuePath(): string {
    const max = this.maxRevenue;
    const points = this.revenueTrend.map((r, i) => {
      const x = (i / (this.revenueTrend.length - 1)) * 100;
      const y = 70 - (r.revenue / max) * 60;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  }

  getRevenueArea(): string {
    return `${this.getRevenuePath()} L 100,70 L 0,70 Z`;
  }

  formatCurrency(amount: number): string {
    if (amount >= 100000) {
      return '₹' + (amount / 100000).toFixed(1) + ' L';
    }
    return '₹' + amount.toLocaleString('en-IN');
  }

  formatFullCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN');
  }

  setModule(module: FinanceModule): void {
    this.activeModule = module;
    this.searchQuery = '';
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      completed: 'status-success', paid: 'status-success', approved: 'status-success',
      pending: 'status-pending', sent: 'status-pending', partial: 'status-pending',
      overdue: 'status-overdue', unpaid: 'status-overdue', failed: 'status-overdue',
      rejected: 'status-overdue', draft: 'status-muted'
    };
    return map[status] || 'status-muted';
  }

  sendReminder(payment: PendingPayment): void {
    payment.status = 'pending';
  }
}
