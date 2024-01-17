import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Slot } from '../Models/slots';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  baseUrl = environment.API_URL;

  private slotCountForDocs = new BehaviorSubject<number>(0);
  public slotCountForDocs$ = this.slotCountForDocs.asObservable();

  private slotCountForPatients = new BehaviorSubject<number>(0);
  public slotCountForPatients$ = this.slotCountForPatients.asObservable();

  constructor(private http: HttpClient) { }

  updateSlotCountForDoctors(){
    this.slotCountForDocs.next(this.slotCountForDocs.getValue() + 1);
  }

  updateSlotCountForPatients(){
    this.slotCountForPatients.next(this.slotCountForPatients.getValue() + 1);
  }

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
    this.http.get<number>(this.baseUrl+"slots/get-doctor-slots-count/"+doctorId).subscribe({
      next:(value:number)=>{
        this.slotCountForDocs.next(value)
      }
    })
    return this.http.get<number>(this.baseUrl+"slots/get-doctor-slots-count/"+doctorId);
  }

  getPatientSlotCount(patientId:string):Observable<number>{
    this.http.get<number>(this.baseUrl+"slots/get-patient-slots-count/"+patientId).subscribe({
      next:(value:number)=>{
        this.slotCountForPatients.next(value);
      }
    })
    return this.http.get<number>(this.baseUrl+"slots/get-patient-slots-count/"+patientId);
  }

}
