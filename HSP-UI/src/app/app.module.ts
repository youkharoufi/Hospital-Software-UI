import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGRXStoreModule } from '@hsi/NGRX-Store';
import { AngularMaterialTheModule } from '@hsi/AngularMaterialTheModule';
import { HomeComponent } from './Home/Home.component';
import { ListOfDoctorsComponent } from './Doctor-List/ListOfDoctors.component';
import { HeaderComponent } from './Header/Header.component';
import { AboutComponent } from './About/About.component';
import { FooterComponent } from './Footer/Footer.component';
import { LoginDialogComponent } from './Dialogs/LoginDialog/LoginDialog.component';
import { RegisterDialogComponent } from './Dialogs/RegisterDialog/RegisterDialog.component';
import { ScheduleComponent } from './Shedule/Schedule.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentComponent } from './Appointment/Appointment.component'; // the main connector

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListOfDoctorsComponent,
    HeaderComponent,
    AboutComponent,
    FooterComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    ScheduleComponent,
    AppointmentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NGRXStoreModule,
    HttpClientModule,
    FullCalendarModule,

    //Angular Material Imports :
    AngularMaterialTheModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
