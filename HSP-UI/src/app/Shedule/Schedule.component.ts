import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlotService } from '@hsi/NGRX-Store';
import { CalendarEvent } from 'angular-calendar';

const colors = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  green: {
    primary: '#28a745',
    secondary: '#DFF6DD'
  }
  // ... more colors if needed
};


@Component({
  selector: 'hsi-schedule',
  templateUrl: './Schedule.component.html',
  styleUrl: './Schedule.component.scss',
})
export class ScheduleComponent {
  viewDate: Date = new Date();
  events: CalendarEvent[]=[];

  docId!:string;
  patientId!:string;

  constructor(private slotService: SlotService, private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.docId = params['id'];
    });

    if(localStorage.getItem('user') !== null && localStorage.getItem('user') !== undefined){
      const user = JSON.parse(localStorage.getItem('user')!);
      this.patientId = user.id
    }

    const now = new Date();
    console.log(now);


    this.slotService.allSlotsByDoctorId(this.docId).subscribe(slots => {

      this.events = slots.map(slot => {

        return {
          start: new Date(slot.slotTime),
          title: new Date(slot.slotTime) < now ? 'Unavailable' : slot.booked ? 'Booked' : "Available",
          color: slot.booked || now > new Date(slot.slotTime) ? colors.red : colors.green,
          meta: {
            slotId: slot.id
          }
        };



      })



  })
  }



  onSlotClick(event: { event: CalendarEvent; sourceEvent: MouseEvent | KeyboardEvent }): void {
    // Check if the event is a slot (not an event)
    if (event.event && event.event.meta && event.event.meta.slotId) {
      const slotId = event.event.meta.slotId;
      // Now you have the slotId, you can use it as needed.
      console.log('Clicked on slot with ID:', slotId);

      this.router.navigateByUrl(`/appointment/${event.event.meta.slotId}/${this.docId}/${this.patientId}`)
    }
  }


}

