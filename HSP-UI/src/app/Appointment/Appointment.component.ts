import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Slot, SlotService, UserFacade } from '@hsi/NGRX-Store';

@Component({
  selector: 'hsi-appointment',
  templateUrl: './Appointment.component.html',
  styleUrl: './Appointment.component.scss',
})
export class AppointmentComponent {

  docId!:string;
  slotId!:string;
  slot!:Slot;
  doctor = this.userFacade.d

  constructor(private route: ActivatedRoute, private slotService: SlotService,
    private userFacade:UserFacade){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.docId = params['id'];
      this.slotId = params['slotId'];

      this.slotService.findSlotById(this.slotId).subscribe({
        next:(value:Slot)=>{
          this.slot = value;
        }
      })

  })
  }
}
