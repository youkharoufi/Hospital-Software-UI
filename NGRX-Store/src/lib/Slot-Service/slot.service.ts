import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Slot } from '../Models/slots';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  baseUrl = environment.API_URL;


  constructor(private http: HttpClient) { }

  allSlotsByDoctorId(doctorId:string): Observable<Slot[]>{
    return this.http.get<Slot[]>(this.baseUrl+"slots/available-slots/"+doctorId)
  }

  patientBooksSlot(patientId:string, doctorId:string, slotId:string): Observable<Slot>{
    return this.http.post<Slot>(this.baseUrl+"slots/patient-books-slot/"+patientId+"/"+doctorId+"/"+slotId, {patientId, doctorId, slotId});
  }

  generateNewSlots(doctorId:string): Observable<Slot>{
    return this.http.post<Slot>(this.baseUrl+"slots/generate-new-slots/"+doctorId, doctorId);
  }

  findSlotById(slotId:string):Observable<Slot>{
    return this.http.get<Slot>(this.baseUrl+"slots/find-slot-by-id/"+slotId);
  }

  getDoctorSlots(doctorId:string):Observable<Slot[]>{
    return this.http.get<Slot[]>(this.baseUrl+"slots/all-doctor-slots/"+doctorId);
  }

  getPatientSlots(patientId:string):Observable<Slot[]>{
    return this.http.get<Slot[]>(this.baseUrl+"slots/all-patient-slots/"+patientId);
  }

  getDoctorSlotCount(doctorId:string):Observable<number>{
    return this.http.get<number>(this.baseUrl+"slots/get-doctor-slots-count/"+doctorId);
  }

  getPatientSlotCount(patientId:string):Observable<number>{
    return this.http.get<number>(this.baseUrl+"slots/get-patient-slots-count/"+patientId);
  }

}
