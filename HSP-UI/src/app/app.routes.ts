import { Route } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { ListOfDoctorsComponent } from './Doctor-List/ListOfDoctors.component';
import { AboutComponent } from './About/About.component';
import { ScheduleComponent } from './Shedule/Schedule.component';
import { AppointmentComponent } from './Appointment/Appointment.component';
import { PersonalScheduleComponent } from './Personal/PersonalSchedule.component';
import { ChatMenuComponent } from './Chat/ChatMenu.component';
import { RegisterDoctorComponent } from './Admin/RegisterDoctor/RegisterDoctor.component';

export const appRoutes: Route[] = [
  {path:'', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'doctor-list', component:ListOfDoctorsComponent},
  {path:'doctor-schedule/:id', component:ScheduleComponent},
  {path:'appointment/:slotId/:doctorId/:patientId', component: AppointmentComponent},
  {path:'personal-schedule', component: PersonalScheduleComponent},
  {path:'chat', component: ChatMenuComponent},
  {path:'create-doctor', component: RegisterDoctorComponent}
];
