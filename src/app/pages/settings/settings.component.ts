import { Component } from '@angular/core';

interface SettingsSection {
  id: string;
  label: string;
  icon: string;
  group: string;
  description: string;
}

interface ToggleSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string;
  avatar: string;
}

interface Permission {
  id: string;
  label: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  color: string;
  users: number;
}

interface BackupRecord {
  id: string;
  date: string;
  size: string;
  type: 'Automatic' | 'Manual';
  status: 'Completed' | 'In Progress' | 'Failed';
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  activeSection = 'school';
  saveMessage = '';
  searchUsers = '';

  sections: SettingsSection[] = [
    { id: 'school', label: 'School Information', icon: 'school', group: 'General', description: 'Basic school profile and contact details' },
    { id: 'academic', label: 'Academic Settings', icon: 'academic', group: 'General', description: 'Sessions, grading, and curriculum configuration' },
    { id: 'users', label: 'User Management', icon: 'users', group: 'Access', description: 'Manage staff accounts and access levels' },
    { id: 'roles', label: 'Roles & Permissions', icon: 'roles', group: 'Access', description: 'Define roles and permission matrix' },
    { id: 'notifications', label: 'Notification Settings', icon: 'notifications', group: 'Communications', description: 'Control alerts and delivery preferences' },
    { id: 'email', label: 'Email Configuration', icon: 'email', group: 'Communications', description: 'SMTP and email template settings' },
    { id: 'sms', label: 'SMS Configuration', icon: 'sms', group: 'Communications', description: 'SMS gateway and messaging setup' },
    { id: 'theme', label: 'Theme Customization', icon: 'theme', group: 'Appearance', description: 'Branding, colors, and display preferences' },
    { id: 'security', label: 'Security Settings', icon: 'security', group: 'System', description: 'Authentication, sessions, and compliance' },
    { id: 'backup', label: 'Backup & Restore', icon: 'backup', group: 'System', description: 'Data backup schedules and recovery' },
  ];

  sectionGroups = ['General', 'Access', 'Communications', 'Appearance', 'System'];

  schoolInfo = {
    name: 'Greenwood International School',
    code: 'GIS-2024',
    email: 'admin@greenwood.edu.in',
    phone: '+91 98765 43210',
    website: 'https://greenwood.edu.in',
    address: '42 Education Lane, Sector 18',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    principal: 'Dr. Meera Sharma',
    established: '1999',
    affiliation: 'CBSE',
  };

  academicSettings = {
    session: '2025-26',
    startDate: '2025-04-01',
    endDate: '2026-03-31',
    gradingSystem: 'Percentage',
    passPercentage: 33,
    maxMarks: 100,
    workingDays: 'Mon–Sat',
    periodsPerDay: 8,
    language: 'English',
  };

  emailConfig = {
    provider: 'SMTP',
    host: 'smtp.greenwood.edu.in',
    port: 587,
    username: 'noreply@greenwood.edu.in',
    encryption: 'TLS',
    fromName: 'Greenwood International School',
    fromEmail: 'noreply@greenwood.edu.in',
  };

  smsConfig = {
    provider: 'Twilio',
    apiKey: '••••••••••••••••',
    senderId: 'GRNWOD',
    countryCode: '+91',
    dailyLimit: 5000,
    templateId: 'DLT-8829104',
  };

  themeSettings = {
    primaryColor: '#8B5CF6',
    accentMode: 'gradient',
    sidebarStyle: 'gradient',
    compactMode: false,
    roundedCorners: true,
    animations: true,
  };

  colorPresets = ['#8B5CF6', '#6366F1', '#3B82F6', '#EC4899', '#14B8A6', '#F59E0B'];

  notificationToggles: ToggleSetting[] = [
    { id: 'email-alerts', label: 'Email Alerts', description: 'Receive important updates via email', enabled: true },
    { id: 'sms-alerts', label: 'SMS Alerts', description: 'Critical notifications sent via SMS', enabled: true },
    { id: 'push-notifications', label: 'Push Notifications', description: 'In-app browser push notifications', enabled: false },
    { id: 'fee-reminders', label: 'Fee Reminders', description: 'Automated fee due date reminders to parents', enabled: true },
    { id: 'attendance-alerts', label: 'Attendance Alerts', description: 'Notify parents when student is absent', enabled: true },
    { id: 'admission-updates', label: 'Admission Updates', description: 'New application and status change alerts', enabled: true },
    { id: 'report-digest', label: 'Weekly Report Digest', description: 'Summary of school metrics every Monday', enabled: false },
    { id: 'ai-insights', label: 'AI Insight Notifications', description: 'Predictive alerts from SchoolMate AI engine', enabled: true },
  ];

  securityToggles: ToggleSetting[] = [
    { id: 'two-factor', label: 'Two-Factor Authentication', description: 'Require 2FA for all admin accounts', enabled: true },
    { id: 'sso', label: 'Single Sign-On (SSO)', description: 'Enable Google/Microsoft SSO login', enabled: false },
    { id: 'ip-restriction', label: 'IP Restriction', description: 'Limit access to whitelisted IP addresses', enabled: false },
    { id: 'session-timeout', label: 'Auto Session Timeout', description: 'Log out inactive users after 30 minutes', enabled: true },
    { id: 'password-policy', label: 'Strong Password Policy', description: 'Enforce complex passwords with rotation', enabled: true },
    { id: 'audit-log', label: 'Audit Logging', description: 'Track all admin actions and changes', enabled: true },
    { id: 'data-encryption', label: 'Data Encryption at Rest', description: 'Encrypt sensitive data in database', enabled: true },
  ];

  users: SystemUser[] = [
    { id: 'U001', name: 'Dr. Meera Sharma', email: 'meera@greenwood.edu.in', role: 'Super Admin', status: 'Active', lastLogin: '2 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera' },
    { id: 'U002', name: 'Rajesh Kumar', email: 'rajesh@greenwood.edu.in', role: 'Admin', status: 'Active', lastLogin: 'Today, 9:14 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh' },
    { id: 'U003', name: 'Priya Nair', email: 'priya@greenwood.edu.in', role: 'Finance Manager', status: 'Active', lastLogin: 'Yesterday', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
    { id: 'U004', name: 'Amit Verma', email: 'amit@greenwood.edu.in', role: 'HR Manager', status: 'Active', lastLogin: '3 days ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit' },
    { id: 'U005', name: 'Sneha Gupta', email: 'sneha@greenwood.edu.in', role: 'Teacher', status: 'Active', lastLogin: 'Today, 8:02 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha' },
    { id: 'U006', name: 'Vikram Singh', email: 'vikram@greenwood.edu.in', role: 'Teacher', status: 'Inactive', lastLogin: '2 weeks ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' },
    { id: 'U007', name: 'Anita Desai', email: 'anita@greenwood.edu.in', role: 'Receptionist', status: 'Pending', lastLogin: 'Never', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anita' },
  ];

  roles: Role[] = [
    { id: 'super-admin', name: 'Super Admin', color: '#8B5CF6', users: 1 },
    { id: 'admin', name: 'Admin', color: '#6366F1', users: 2 },
    { id: 'finance', name: 'Finance Manager', color: '#22C55E', users: 3 },
    { id: 'hr', name: 'HR Manager', color: '#F59E0B', users: 2 },
    { id: 'teacher', name: 'Teacher', color: '#3B82F6', users: 48 },
    { id: 'receptionist', name: 'Receptionist', color: '#EC4899', users: 4 },
  ];

  permissions: Permission[] = [
    { id: 'dashboard', label: 'View Dashboard', category: 'General' },
    { id: 'students-view', label: 'View Students', category: 'Students' },
    { id: 'students-edit', label: 'Edit Students', category: 'Students' },
    { id: 'students-delete', label: 'Delete Students', category: 'Students' },
    { id: 'admissions', label: 'Manage Admissions', category: 'Admissions' },
    { id: 'teachers', label: 'Manage Teachers', category: 'Teachers' },
    { id: 'finance-view', label: 'View Finance', category: 'Finance' },
    { id: 'finance-edit', label: 'Edit Finance', category: 'Finance' },
    { id: 'reports', label: 'Generate Reports', category: 'Reports' },
    { id: 'ai-insights', label: 'Access AI Insights', category: 'AI' },
    { id: 'settings', label: 'System Settings', category: 'Admin' },
    { id: 'users-manage', label: 'Manage Users', category: 'Admin' },
  ];

  accessMatrix: Record<string, Record<string, boolean>> = {
    'super-admin': { dashboard: true, 'students-view': true, 'students-edit': true, 'students-delete': true, admissions: true, teachers: true, 'finance-view': true, 'finance-edit': true, reports: true, 'ai-insights': true, settings: true, 'users-manage': true },
    'admin': { dashboard: true, 'students-view': true, 'students-edit': true, 'students-delete': false, admissions: true, teachers: true, 'finance-view': true, 'finance-edit': false, reports: true, 'ai-insights': true, settings: false, 'users-manage': false },
    'finance': { dashboard: true, 'students-view': true, 'students-edit': false, 'students-delete': false, admissions: false, teachers: false, 'finance-view': true, 'finance-edit': true, reports: true, 'ai-insights': false, settings: false, 'users-manage': false },
    'hr': { dashboard: true, 'students-view': true, 'students-edit': false, 'students-delete': false, admissions: false, teachers: true, 'finance-view': false, 'finance-edit': false, reports: true, 'ai-insights': false, settings: false, 'users-manage': false },
    'teacher': { dashboard: true, 'students-view': true, 'students-edit': false, 'students-delete': false, admissions: false, teachers: false, 'finance-view': false, 'finance-edit': false, reports: false, 'ai-insights': false, settings: false, 'users-manage': false },
    'receptionist': { dashboard: true, 'students-view': true, 'students-edit': false, 'students-delete': false, admissions: true, teachers: false, 'finance-view': false, 'finance-edit': false, reports: false, 'ai-insights': false, settings: false, 'users-manage': false },
  };

  backupSchedule = {
    frequency: 'Daily',
    time: '02:00',
    retention: 30,
    cloudSync: true,
    encryptBackups: true,
  };

  backups: BackupRecord[] = [
    { id: 'B001', date: 'Jun 8, 2026 · 2:00 AM', size: '2.4 GB', type: 'Automatic', status: 'Completed' },
    { id: 'B002', date: 'Jun 7, 2026 · 2:00 AM', size: '2.3 GB', type: 'Automatic', status: 'Completed' },
    { id: 'B003', date: 'Jun 6, 2026 · 2:00 AM', size: '2.3 GB', type: 'Automatic', status: 'Completed' },
    { id: 'B004', date: 'Jun 5, 2026 · 11:30 AM', size: '2.2 GB', type: 'Manual', status: 'Completed' },
    { id: 'B005', date: 'Jun 4, 2026 · 2:00 AM', size: '2.2 GB', type: 'Automatic', status: 'Failed' },
  ];

  get filteredUsers(): SystemUser[] {
    const q = this.searchUsers.toLowerCase().trim();
    if (!q) return this.users;
    return this.users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  }

  get activeSectionMeta(): SettingsSection | undefined {
    return this.sections.find(s => s.id === this.activeSection);
  }

  getSectionsByGroup(group: string): SettingsSection[] {
    return this.sections.filter(s => s.group === group);
  }

  setSection(id: string): void {
    this.activeSection = id;
    this.saveMessage = '';
  }

  toggleSetting(list: ToggleSetting[], id: string): void {
    const item = list.find(t => t.id === id);
    if (item) item.enabled = !item.enabled;
  }

  togglePermission(roleId: string, permId: string): void {
    if (roleId === 'super-admin') return;
    if (!this.accessMatrix[roleId]) return;
    this.accessMatrix[roleId][permId] = !this.accessMatrix[roleId][permId];
  }

  hasPermission(roleId: string, permId: string): boolean {
    return this.accessMatrix[roleId]?.[permId] ?? false;
  }

  setThemeColor(color: string): void {
    this.themeSettings.primaryColor = color;
  }

  saveSettings(): void {
    this.saveMessage = 'Settings saved successfully';
    setTimeout(() => (this.saveMessage = ''), 3000);
  }

  testEmailConnection(): void {
    this.saveMessage = 'Test email sent successfully';
    setTimeout(() => (this.saveMessage = ''), 3000);
  }

  testSmsConnection(): void {
    this.saveMessage = 'Test SMS delivered successfully';
    setTimeout(() => (this.saveMessage = ''), 3000);
  }

  runBackup(): void {
    this.backups.unshift({
      id: 'B' + Date.now(),
      date: 'Just now',
      size: '—',
      type: 'Manual',
      status: 'In Progress',
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active': case 'Completed': return 'badge-success';
      case 'Pending': case 'In Progress': return 'badge-warning';
      case 'Inactive': case 'Failed': return 'badge-danger';
      default: return 'badge-info';
    }
  }
}
