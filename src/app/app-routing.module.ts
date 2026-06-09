import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdmissionsComponent } from './pages/admissions/admissions.component';
import { StudentsComponent } from './pages/students/students.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { HrManagementComponent } from './pages/hr-management/hr-management.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AiInsightsComponent } from './pages/ai-insights/ai-insights.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { TransportComponent } from './pages/transport/transport.component';
import { RoleSelectComponent } from './pages/auth/role-select/role-select.component';
import { StudentLoginComponent } from './pages/auth/student-login/student-login.component';
import { TeacherLoginComponent } from './pages/auth/teacher-login/teacher-login.component';
import { ParentLoginComponent } from './pages/auth/parent-login/parent-login.component';
import { AdminLoginComponent } from './pages/auth/admin-login/admin-login.component';
import { StudentDashboardComponent } from './pages/student-portal/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './pages/teacher-portal/teacher-dashboard/teacher-dashboard.component';
import { ParentDashboardComponent } from './pages/parent-portal/parent-dashboard/parent-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: RoleSelectComponent },
  { path: 'login/student', component: StudentLoginComponent },
  { path: 'login/teacher', component: TeacherLoginComponent },
  { path: 'login/parent', component: ParentLoginComponent },
  { path: 'login/admin', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'dashboard', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: 'admissions', component: AdmissionsComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'hr', component: HrManagementComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'transport', component: TransportComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'ai-insights', component: AiInsightsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'student/dashboard', component: StudentDashboardComponent },
  { path: 'teacher/dashboard', component: TeacherDashboardComponent },
  { path: 'parent/dashboard', component: ParentDashboardComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
