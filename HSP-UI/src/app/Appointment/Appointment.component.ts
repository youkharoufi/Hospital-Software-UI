import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ApplicationUser, Slot, SlotService, UserFacade } from '@hsi/NGRX-Store';
import { AppointmentSnackbarComponent } from '../Snackbars/Appointment-Snackbar/Appointment-Snackbar.component';

@Component({
  selector: 'hsi-appointment',
  templateUrl: './Appointment.component.html',
  styleUrl: './Appointment.component.scss',
})
export class AppointmentComponent {

  docId!:string;
  slotId!:string;
  slot!:Slot;
  doctor = this.userFacade.filteredDoctor$;
  user!:ApplicationUser;

  constructor(private route: ActivatedRoute, private slotService: SlotService,
    private userFacade:UserFacade, private _snackBar: MatSnackBar){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.docId = params['id'];
      this.slotId = params['slotId'];

      this.slotService.findSlotById(this.slotId).subscribe({
        next:(value:Slot)=>{
          this.slot = value;
        }
      });

      this.userFacade.getDoctorById(this.docId);

  })

  if(localStorage.getItem('user') !== null && localStorage.getItem('user') !== undefined){
      this.user = JSON.parse(localStorage.getItem('user')!)
  }


  }

  openSnackBar() {
    this._snackBar.openFromComponent(AppointmentSnackbarComponent, {
      duration:5000
    });
  }

  bookAppointment(){
    this.slotService.patientBooksSlot(this.user.id, this.docId, this.slotId).subscribe({
      next:()=>{
        this.openSnackBar()
      },
      error:()=>{
        console.log("Failed to book appointment");
      }
    })
  }
}
