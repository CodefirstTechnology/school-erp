import { Component } from '@angular/core';

interface StudentKpi {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
}

interface AcademicRecord {
  subject: string;
  score: number;
  grade: string;
}

interface AttendanceRecord {
  month: string;
  present: number;
  total: number;
}

interface FeeRecord {
  term: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
}

interface Document {
  name: string;
  type: string;
  uploaded: string;
}

interface Student {
  id: string;
  rollNumber: string;
  fullName: string;
  class: string;
  section: string;
  gender: 'Male' | 'Female';
  parentName: string;
  parentContact: string;
  parentEmail: string;
  attendance: number;
  academicScore: number;
  status: 'active' | 'inactive';
  dateOfBirth: string;
  bloodGroup: string;
  address: string;
  admissionDate: string;
  academicRecords: AcademicRecord[];
  attendanceHistory: AttendanceRecord[];
  feeRecords: FeeRecord[];
  documents: Document[];
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  academicYears = ['2025-26', '2024-25', '2023-24'];
  classes = ['All Classes', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
  sections = ['All Sections', 'A', 'B', 'C', 'D'];
  genders = ['All Genders', 'Male', 'Female'];

  selectedYear = '2025-26';
  selectedClass = 'All Classes';
  selectedSection = 'All Sections';
  selectedGender = 'All Genders';
  searchQuery = '';

  showProfile = false;
  selectedStudent: Student | null = null;
  profileTab: 'personal' | 'academic' | 'attendance' | 'fees' | 'documents' = 'personal';

  kpiCards: StudentKpi[] = [
    { title: 'Total Students', value: '4,850', subtitle: 'Enrolled across all grades', icon: 'total', color: 'purple' },
    { title: 'Active Students', value: '4,712', subtitle: '97.2% active enrollment', icon: 'active', color: 'success' },
    { title: 'New Admissions', value: '186', subtitle: 'Joined this academic year', icon: 'new', color: 'info' },
    { title: 'Attendance Percentage', value: '94.2%', subtitle: 'School-wide average', icon: 'attendance', color: 'warning' }
  ];

  students: Student[] = [
    {
      id: '1', rollNumber: 'STU-2026-0842', fullName: 'Aarav Sharma', class: 'Class 10', section: 'A',
      gender: 'Male', parentName: 'Rohit Sharma', parentContact: '+91 98765 43210', parentEmail: 'rohit.sharma@email.com',
      attendance: 96, academicScore: 88, status: 'active', dateOfBirth: '15 Mar 2011', bloodGroup: 'B+',
      address: '42, Green Park, New Delhi', admissionDate: 'Apr 12, 2018',
      academicRecords: [
        { subject: 'Mathematics', score: 92, grade: 'A+' }, { subject: 'Science', score: 88, grade: 'A' },
        { subject: 'English', score: 85, grade: 'A' }, { subject: 'Hindi', score: 90, grade: 'A+' },
        { subject: 'Social Studies', score: 84, grade: 'A' }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 22, total: 23 }, { month: 'Feb', present: 20, total: 21 },
        { month: 'Mar', present: 23, total: 24 }, { month: 'Apr', present: 21, total: 22 },
        { month: 'May', present: 22, total: 23 }, { month: 'Jun', present: 18, total: 19 }
      ],
      feeRecords: [
        { term: 'Term 1 (2025-26)', amount: '₹45,000', status: 'paid', dueDate: 'Apr 15, 2025' },
        { term: 'Term 2 (2025-26)', amount: '₹45,000', status: 'paid', dueDate: 'Aug 15, 2025' },
        { term: 'Term 3 (2025-26)', amount: '₹45,000', status: 'pending', dueDate: 'Dec 15, 2025' }
      ],
      documents: [
        { name: 'Birth Certificate', type: 'PDF', uploaded: 'Apr 12, 2018' },
        { name: 'Transfer Certificate', type: 'PDF', uploaded: 'Apr 12, 2018' },
        { name: 'Aadhaar Card', type: 'PDF', uploaded: 'Apr 15, 2018' }
      ]
    },
    {
      id: '2', rollNumber: 'STU-2026-0841', fullName: 'Priya Nair', class: 'Class 9', section: 'B',
      gender: 'Female', parentName: 'Lakshmi Nair', parentContact: '+91 98765 43211', parentEmail: 'lakshmi.n@email.com',
      attendance: 94, academicScore: 91, status: 'active', dateOfBirth: '22 Jul 2012', bloodGroup: 'O+',
      address: '18, Lake View Apartments, Bangalore', admissionDate: 'Jun 5, 2019',
      academicRecords: [
        { subject: 'Mathematics', score: 95, grade: 'A+' }, { subject: 'Science', score: 93, grade: 'A+' },
        { subject: 'English', score: 89, grade: 'A' }, { subject: 'Hindi', score: 87, grade: 'A' }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 21, total: 23 }, { month: 'Feb', present: 19, total: 21 },
        { month: 'Mar', present: 22, total: 24 }, { month: 'Apr', present: 20, total: 22 }
      ],
      feeRecords: [
        { term: 'Term 1 (2025-26)', amount: '₹42,000', status: 'paid', dueDate: 'Apr 15, 2025' },
        { term: 'Term 2 (2025-26)', amount: '₹42,000', status: 'pending', dueDate: 'Aug 15, 2025' }
      ],
      documents: [
        { name: 'Birth Certificate', type: 'PDF', uploaded: 'Jun 5, 2019' },
        { name: 'Medical Report', type: 'PDF', uploaded: 'Jun 8, 2019' }
      ]
    },
    {
      id: '3', rollNumber: 'STU-2026-0840', fullName: 'Vihaan Patel', class: 'Class 8', section: 'A',
      gender: 'Male', parentName: 'Kiran Patel', parentContact: '+91 98765 43212', parentEmail: 'kiran.p@email.com',
      attendance: 89, academicScore: 78, status: 'active', dateOfBirth: '8 Nov 2013', bloodGroup: 'A+',
      address: '7, Sunrise Colony, Ahmedabad', admissionDate: 'Apr 1, 2020',
      academicRecords: [
        { subject: 'Mathematics', score: 76, grade: 'B+' }, { subject: 'Science', score: 80, grade: 'A' },
        { subject: 'English', score: 74, grade: 'B+' }, { subject: 'Hindi', score: 82, grade: 'A' }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 20, total: 23 }, { month: 'Feb', present: 18, total: 21 },
        { month: 'Mar', present: 21, total: 24 }, { month: 'Apr', present: 19, total: 22 }
      ],
      feeRecords: [
        { term: 'Term 1 (2025-26)', amount: '₹38,000', status: 'paid', dueDate: 'Apr 15, 2025' },
        { term: 'Term 2 (2025-26)', amount: '₹38,000', status: 'overdue', dueDate: 'Aug 15, 2025' }
      ],
      documents: [{ name: 'Birth Certificate', type: 'PDF', uploaded: 'Apr 1, 2020' }]
    },
    {
      id: '4', rollNumber: 'STU-2026-0839', fullName: 'Ananya Reddy', class: 'Class 11', section: 'A',
      gender: 'Female', parentName: 'Suresh Reddy', parentContact: '+91 98765 43213', parentEmail: 'suresh.r@email.com',
      attendance: 97, academicScore: 94, status: 'active', dateOfBirth: '3 Feb 2010', bloodGroup: 'AB+',
      address: '55, Hill Road, Hyderabad', admissionDate: 'Apr 10, 2017',
      academicRecords: [
        { subject: 'Physics', score: 96, grade: 'A+' }, { subject: 'Chemistry', score: 94, grade: 'A+' },
        { subject: 'Mathematics', score: 95, grade: 'A+' }, { subject: 'English', score: 91, grade: 'A+' }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 23, total: 23 }, { month: 'Feb', present: 21, total: 21 },
        { month: 'Mar', present: 24, total: 24 }, { month: 'Apr', present: 22, total: 22 }
      ],
      feeRecords: [
        { term: 'Term 1 (2025-26)', amount: '₹52,000', status: 'paid', dueDate: 'Apr 15, 2025' },
        { term: 'Term 2 (2025-26)', amount: '₹52,000', status: 'paid', dueDate: 'Aug 15, 2025' }
      ],
      documents: [
        { name: 'Birth Certificate', type: 'PDF', uploaded: 'Apr 10, 2017' },
        { name: 'Board Exam Admit Card', type: 'PDF', uploaded: 'Jan 5, 2026' }
      ]
    },
    {
      id: '5', rollNumber: 'STU-2026-0838', fullName: 'Arjun Mehta', class: 'Class 7', section: 'C',
      gender: 'Male', parentName: 'Deepa Mehta', parentContact: '+91 98765 43214', parentEmail: 'deepa.m@email.com',
      attendance: 91, academicScore: 82, status: 'active', dateOfBirth: '19 Sep 2014', bloodGroup: 'O-',
      address: '23, Park Street, Mumbai', admissionDate: 'Jun 15, 2021',
      academicRecords: [
        { subject: 'Mathematics', score: 84, grade: 'A' }, { subject: 'Science', score: 80, grade: 'A' },
        { subject: 'English', score: 78, grade: 'B+' }, { subject: 'Hindi', score: 86, grade: 'A' }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 21, total: 23 }, { month: 'Feb', present: 19, total: 21 },
        { month: 'Mar', present: 22, total: 24 }, { month: 'Apr', present: 20, total: 22 }
      ],
      feeRecords: [{ term: 'Term 1 (2025-26)', amount: '₹36,000', status: 'paid', dueDate: 'Apr 15, 2025' }],
      documents: [{ name: 'Birth Certificate', type: 'PDF', uploaded: 'Jun 15, 2021' }]
    },
    {
      id: '6', rollNumber: 'STU-2026-0837', fullName: 'Ishita Gupta', class: 'Class 6', section: 'B',
      gender: 'Female', parentName: 'Amit Gupta', parentContact: '+91 98765 43215', parentEmail: 'amit.g@email.com',
      attendance: 93, academicScore: 86, status: 'active', dateOfBirth: '11 Dec 2015', bloodGroup: 'B-',
      address: '9, Model Town, Chandigarh', admissionDate: 'Apr 3, 2022',
      academicRecords: [
        { subject: 'Mathematics', score: 88, grade: 'A' }, { subject: 'Science', score: 85, grade: 'A' },
        { subject: 'English', score: 84, grade: 'A' }, { subject: 'Hindi', score: 87, grade: 'A' }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 22, total: 23 }, { month: 'Feb', present: 20, total: 21 },
        { month: 'Mar', present: 23, total: 24 }, { month: 'Apr', present: 21, total: 22 }
      ],
      feeRecords: [{ term: 'Term 1 (2025-26)', amount: '₹34,000', status: 'paid', dueDate: 'Apr 15, 2025' }],
      documents: [{ name: 'Birth Certificate', type: 'PDF', uploaded: 'Apr 3, 2022' }]
    },
    {
      id: '7', rollNumber: 'STU-2026-0836', fullName: 'Rohan Das', class: 'Class 12', section: 'A',
      gender: 'Male', parentName: 'Pallavi Das', parentContact: '+91 98765 43216', parentEmail: 'pallavi.d@email.com',
      attendance: 95, academicScore: 90, status: 'active', dateOfBirth: '27 May 2009', bloodGroup: 'A-',
      address: '31, Salt Lake, Kolkata', admissionDate: 'Apr 8, 2016',
      academicRecords: [
        { subject: 'Physics', score: 92, grade: 'A+' }, { subject: 'Chemistry', score: 88, grade: 'A' },
        { subject: 'Mathematics', score: 91, grade: 'A+' }, { subject: 'English', score: 89, grade: 'A' }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 22, total: 23 }, { month: 'Feb', present: 20, total: 21 },
        { month: 'Mar', present: 23, total: 24 }, { month: 'Apr', present: 21, total: 22 }
      ],
      feeRecords: [
        { term: 'Term 1 (2025-26)', amount: '₹55,000', status: 'paid', dueDate: 'Apr 15, 2025' },
        { term: 'Term 2 (2025-26)', amount: '₹55,000', status: 'paid', dueDate: 'Aug 15, 2025' }
      ],
      documents: [
        { name: 'Birth Certificate', type: 'PDF', uploaded: 'Apr 8, 2016' },
        { name: 'Character Certificate', type: 'PDF', uploaded: 'May 1, 2025' }
      ]
    },
    {
      id: '8', rollNumber: 'STU-2026-0835', fullName: 'Saanvi Iyer', class: 'Class 10', section: 'B',
      gender: 'Female', parentName: 'Vikram Iyer', parentContact: '+91 98765 43217', parentEmail: 'vikram.i@email.com',
      attendance: 88, academicScore: 85, status: 'inactive', dateOfBirth: '6 Aug 2011', bloodGroup: 'O+',
      address: '14, MG Road, Chennai', admissionDate: 'Jun 20, 2018',
      academicRecords: [
        { subject: 'Mathematics', score: 86, grade: 'A' }, { subject: 'Science', score: 84, grade: 'A' },
        { subject: 'English', score: 82, grade: 'A' }, { subject: 'Hindi', score: 88, grade: 'A' }
      ],
      attendanceHistory: [
        { month: 'Jan', present: 19, total: 23 }, { month: 'Feb', present: 17, total: 21 },
        { month: 'Mar', present: 20, total: 24 }, { month: 'Apr', present: 18, total: 22 }
      ],
      feeRecords: [{ term: 'Term 1 (2025-26)', amount: '₹45,000', status: 'overdue', dueDate: 'Apr 15, 2025' }],
      documents: [{ name: 'Birth Certificate', type: 'PDF', uploaded: 'Jun 20, 2018' }]
    }
  ];

  get filteredStudents(): Student[] {
    return this.students.filter(s => {
      const matchClass = this.selectedClass === 'All Classes' || s.class === this.selectedClass;
      const matchSection = this.selectedSection === 'All Sections' || s.section === this.selectedSection;
      const matchGender = this.selectedGender === 'All Genders' || s.gender === this.selectedGender;
      const matchSearch = !this.searchQuery ||
        s.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.parentName.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchClass && matchSection && matchGender && matchSearch;
    });
  }

  getAttendanceClass(pct: number): string {
    if (pct >= 95) return 'high';
    if (pct >= 85) return 'medium';
    return 'low';
  }

  getScoreClass(score: number): string {
    if (score >= 90) return 'high';
    if (score >= 75) return 'medium';
    return 'low';
  }

  getFeeStatusClass(status: string): string {
    const map: Record<string, string> = { paid: 'fee-paid', pending: 'fee-pending', overdue: 'fee-overdue' };
    return map[status] || '';
  }

  viewProfile(student: Student): void {
    this.selectedStudent = student;
    this.profileTab = 'personal';
    this.showProfile = false;
    setTimeout(() => this.showProfile = true, 20);
  }

  closeProfile(): void {
    this.showProfile = false;
    setTimeout(() => {
      this.selectedStudent = null;
    }, 350);
  }

  setProfileTab(tab: 'personal' | 'academic' | 'attendance' | 'fees' | 'documents'): void {
    this.profileTab = tab;
  }

  deleteStudent(student: Student): void {
    this.students = this.students.filter(s => s.id !== student.id);
    if (this.selectedStudent?.id === student.id) {
      this.closeProfile();
    }
  }

  getAvatarUrl(name: string): string {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=c4b5fd`;
  }
}
