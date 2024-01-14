import { CalendarEvent } from "angular-calendar";

export interface CustomCalendarEvent extends CalendarEvent {
  slotId?: string;
}
