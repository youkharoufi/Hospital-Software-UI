import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatWithPatientComponent } from './ChatWithPatient.component';

describe('ChatWithPatientComponent', () => {
  let component: ChatWithPatientComponent;
  let fixture: ComponentFixture<ChatWithPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatWithPatientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatWithPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
