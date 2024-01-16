import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Slot, SlotService, UserFacade } from '@hsi/NGRX-Store';
import { AppointmentSnackbarComponent } from '../Snackbars/Appointment-Snackbar/Appointment-Snackbar.component';
import { ErrorSnackBarComponent } from '../Snackbars/Error-SnackBar/ErrorSnackBar.component';

@Component({
  selector: 'hsi-appointment',
  templateUrl: './Appointment.component.html',
  styleUrl: './Appointment.component.scss',
})
export class AppointmentComponent {

  docId!:string;
  slotId!:string;
  slot?:Slot;
  doctor = this.userFacade.filteredDoctor$;
  userId!:string;

  constructor(private route: ActivatedRoute, private slotService: SlotService,
    private userFacade:UserFacade, private _snackBar: MatSnackBar){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.docId = params['doctorId'];
      this.slotId = params['slotId'];
      this.userId = params['patientId'];


      this.slotService.findSlotById(this.slotId).subscribe({
        next:(value:Slot)=>{
          this.slot = value;
        }
      });

        this.userFacade.getDoctorById(this.docId);


  })


  }

  openSnackBar() {
    this._snackBar.openFromComponent(AppointmentSnackbarComponent, {
      duration:5000
    });
  }

  bookAppointment(){
    console.log(this.userId);
    this.slotService.patientBooksSlot(this.userId, this.docId, this.slotId).subscribe({
      next:()=>{
        this.openSnackBar()
      },
      error:()=>{
        this.openSnackBar2();
      }
    })
  }

  openSnackBar2() {
    this._snackBar.openFromComponent(ErrorSnackBarComponent, {
      duration:5000
    });
  }
}
