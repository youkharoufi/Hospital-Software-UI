import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOfDoctorsComponent } from './ListOfDoctors.component';

describe('ListOfDoctorsComponent', () => {
  let component: ListOfDoctorsComponent;
  let fixture: ComponentFixture<ListOfDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOfDoctorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
