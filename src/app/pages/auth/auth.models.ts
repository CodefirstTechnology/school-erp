export type RoleId = 'admin' | 'teacher' | 'student' | 'parent';

export interface UserRole {
  id: RoleId;
  name: string;
  description: string;
  icon: string;
  loginRoute: string;
  dashboardRoute: string;
}

export const ROLE_SELECT_ROLES: UserRole[] = [
  {
    id: 'student',
    name: 'Student',
    description: 'Assignments, timetable, grades, attendance & learning resources',
    icon: 'student',
    loginRoute: '/login/student',
    dashboardRoute: '/student/dashboard'
  },
  {
    id: 'teacher',
    name: 'Teacher',
    description: 'Classes, attendance, grades, lesson plans & student progress',
    icon: 'teacher',
    loginRoute: '/login/teacher',
    dashboardRoute: '/teacher/dashboard'
  },
  {
    id: 'parent',
    name: 'Parent',
    description: 'Track child progress, fees, attendance alerts & school communication',
    icon: 'parent',
    loginRoute: '/login/parent',
    dashboardRoute: '/parent/dashboard'
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Manage school operations, staff, admissions & daily administration',
    icon: 'admin',
    loginRoute: '/login/admin',
    dashboardRoute: '/admin/dashboard'
  }
];

export function getRoleById(id: string): UserRole | undefined {
  return ROLE_SELECT_ROLES.find(r => r.id === id);
}
