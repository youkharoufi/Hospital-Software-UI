import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentSnackbarComponent } from './Appointment-Snackbar.component';

describe('AppointmentSnackbarComponent', () => {
  let component: AppointmentSnackbarComponent;
  let fixture: ComponentFixture<AppointmentSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentSnackbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
