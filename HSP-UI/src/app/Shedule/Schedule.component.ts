import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Slot, SlotService } from '@hsi/NGRX-Store';


@Component({
  selector: 'hsi-schedule',
  templateUrl: './Schedule.component.html',
  styleUrl: './Schedule.component.scss',
})
export class ScheduleComponent {
  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  hours = Array.from({ length: 24 }, (_, i) => i);
  slots: Slot[] = [];
  slotsByDayAndHour: { [key: string]: Slot[] } = {};

  docId!:string;
  patientId!:string;

  constructor(private slotService: SlotService, private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.docId = params['id']; // The name 'id' should match the route parameter name
      this.slotService.allSlotsByDoctorId(this.docId).subscribe(data => {
        this.slots = data;
        this.processSlots();
      });
    });

    if(localStorage.getItem('user') !== null && localStorage.getItem('user') !== undefined){
      const user = JSON.parse(localStorage.getItem('user')!);
      this.patientId = user.id
    }



  }

  processSlots() {
    this.slots.forEach(slot => {
      const slotDate = new Date(slot.slotTime);
      const day = this.weekDays[slotDate.getDay()];
      const hour = slotDate.getHours();
      const key = `${day}-${hour}`;

      if (!this.slotsByDayAndHour[key]) {
        this.slotsByDayAndHour[key] = [];
      }

      this.slotsByDayAndHour[key].push(slot);
    });
  }

  isSlotBooked(day: string, hour: number): boolean {
    const key = `${day}-${hour}`;
    const slotsForThisHour = this.slotsByDayAndHour[key];

    if (slotsForThisHour) {
      // Check if any slot in this hour is booked
      return slotsForThisHour.some(slot => slot.booked);
    }

    return false; // Return false if there are no slots in this hour
  }

  getBookedSlot(day: string, hour: number): Slot | null {
    const key = `${day}-${hour}`;
    const slotsForThisHour = this.slotsByDayAndHour[key];

    if (slotsForThisHour) {
      const bookedSlot = slotsForThisHour.find(slot => slot.booked);
      return bookedSlot || null;
    }

    return null;
  }

  getUnBookedSlot(day: string, hour: number): Slot | null {
    const key = `${day}-${hour}`;
    const slotsForThisHour = this.slotsByDayAndHour[key];

    if (slotsForThisHour) {
      const bookedSlot = slotsForThisHour.find(slot => !slot.booked);
      return bookedSlot || null;
    }

    return null;
  }

  bookAppointment(slotId:string, doctorId:string, patId:string){
    this.router.navigateByUrl(`/appointment/${slotId}/${doctorId}/${patId}`);
  }

}

