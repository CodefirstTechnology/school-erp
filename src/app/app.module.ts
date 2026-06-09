import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AiAssistantComponent } from './components/ai-assistant/ai-assistant.component';
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
import { StudentSidebarComponent } from './components/student-sidebar/student-sidebar.component';
import { TeacherSidebarComponent } from './components/teacher-sidebar/teacher-sidebar.component';
import { ParentSidebarComponent } from './components/parent-sidebar/parent-sidebar.component';
import { BrandLogoComponent } from './components/brand-logo/brand-logo.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopNavComponent,
    DashboardComponent,
    AiAssistantComponent,
    AdmissionsComponent,
    StudentsComponent,
    TeachersComponent,
    HrManagementComponent,
    FinanceComponent,
    ReportsComponent,
    AiInsightsComponent,
    SettingsComponent,
    TransportComponent,
    RoleSelectComponent,
    StudentLoginComponent,
    TeacherLoginComponent,
    ParentLoginComponent,
    AdminLoginComponent,
    StudentDashboardComponent,
    TeacherDashboardComponent,
    ParentDashboardComponent,
    StudentSidebarComponent,
    TeacherSidebarComponent,
    ParentSidebarComponent,
    BrandLogoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
