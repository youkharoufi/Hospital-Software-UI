import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationUser, SlotService } from '@hsi/NGRX-Store';
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
  selector: 'hsi-personal-schedule',
  templateUrl: './PersonalSchedule.component.html',
  styleUrl: './PersonalSchedule.component.scss',
})
export class PersonalScheduleComponent {

  viewDate: Date = new Date();
  events: CalendarEvent[]=[];

  docId!:string;
  user!:ApplicationUser;

  constructor(private slotService: SlotService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    if(localStorage.getItem('user') !== null && localStorage.getItem('user') !== undefined){
      const user = JSON.parse(localStorage.getItem('user')!);
      this.user = user;
    }

    const now = new Date();
    console.log(now);


    if(this.user.roleName === "Patient"){
      this.slotService.getPatientSlots(this.user.id).subscribe(slots => {

        this.events = slots.map(slot => {

          return {
            start: new Date(slot.slotTime),
            title: slot.booked ? 'Booked' : 'Available',
            color: slot.booked || now > new Date(slot.slotTime) ? colors.red : colors.green,
            meta: {
              slotId: slot.id
            }
          };



        })
        })

    }


      if(this.user.roleName === 'Doctor'){
        this.slotService.getDoctorSlots(this.user.id).subscribe(slots => {

          this.events = slots.map(slot => {

            return {
              start: new Date(slot.slotTime),
              title: slot.booked ? 'Booked' : 'Available',
              color: slot.booked || now > new Date(slot.slotTime) ? colors.red : colors.green,
              meta: {
                slotId: slot.id
              }
            };



          })
          })
      }

  }


}
