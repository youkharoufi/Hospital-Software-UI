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

  findSlotById(slotId:string):Observable<Slot>{
    return this.http.get<Slot>(this.baseUrl+"slots/find-slot-by-id/"+slotId);
  }


}
