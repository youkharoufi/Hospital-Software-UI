import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuardSnackBarComponent } from './GuardSnackBar.component';

describe('GuardSnackBarComponent', () => {
  let component: GuardSnackBarComponent;
  let fixture: ComponentFixture<GuardSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuardSnackBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GuardSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
