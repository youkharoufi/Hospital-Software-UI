export interface Slot{
  id:string;
  slotTime:Date;
  doctorId:string;
  patientId?:string;
  booked:boolean;
}
