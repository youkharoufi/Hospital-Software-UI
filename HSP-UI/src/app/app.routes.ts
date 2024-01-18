import { Route } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { ListOfDoctorsComponent } from './Doctor-List/ListOfDoctors.component';
import { AboutComponent } from './About/About.component';
import { ScheduleComponent } from './Shedule/Schedule.component';
import { AppointmentComponent } from './Appointment/Appointment.component';
import { PersonalScheduleComponent } from './Personal/PersonalSchedule.component';
import { ChatMenuComponent } from './Chat/ChatMenu.component';
import { RegisterDoctorComponent } from './Admin/RegisterDoctor/RegisterDoctor.component';
import { ChatWithPatientComponent } from './ChatWithPatient/ChatWithPatient.component';
import { AuthGuard } from './Guard/auth.guard';
import { PatientGuard } from './Guard/patient.guard';
import { DoctorGuard } from './Guard/doctor.guard';
import { AdminGuard } from './Guard/admin.guard';

export const appRoutes: Route[] = [
  {path:'', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'doctor-list', component:ListOfDoctorsComponent, canActivate: [AuthGuard]},
  {path:'doctor-schedule/:id', component:ScheduleComponent, canActivate:[AuthGuard]},
  {path:'appointment/:slotId/:doctorId/:patientId', component: AppointmentComponent, canActivate:[AuthGuard, PatientGuard]},
  {path:'personal-schedule', component: PersonalScheduleComponent, canActivate:[AuthGuard]},
  {path:'chat-with-doctor', component: ChatMenuComponent, canActivate:[AuthGuard, PatientGuard]},
  {path:'chat-with-patient', component: ChatWithPatientComponent, canActivate:[AuthGuard, DoctorGuard]},
  {path:'create-doctor', component: RegisterDoctorComponent, canActivate:[AuthGuard, AdminGuard]}
];
