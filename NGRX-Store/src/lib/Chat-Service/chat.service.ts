import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Message } from '../Models/message.model';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl = environment.API_URL;

  private unreadPatientMessagesCount = new BehaviorSubject<number>(0);
  public unreadPatientMessagesCount$ = this.unreadPatientMessagesCount.asObservable();

  private unreadDoctorMessagesCount = new BehaviorSubject<number>(0);
  public unreadDoctorMessagesCount$ = this.unreadDoctorMessagesCount.asObservable();

  constructor(private http: HttpClient) { }


  updatePatientUnreadMessagesCount(count: number) {
    this.unreadPatientMessagesCount.next(count);
  }

  updateDoctorUnreadMessagesCount(count: number) {
    this.unreadDoctorMessagesCount.next(count);
  }

  sendMessageFromDoctorToPatient(doctorId:string, patientId:string, content:string): Observable<Message>{
    const body = { content };
    return this.http.post<Message>(this.baseUrl+"messages/message-from-doctor-to-patient/"+doctorId+"/"+patientId, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  });
  }

  sendMessageFromPatientToDoctor(doctorId?:string, patientId?:string, content?:FormData): Observable<Message>{
    return this.http.post<Message>(this.baseUrl+"messages/message-from-patient-to-doctor/"+doctorId+"/"+patientId, content);
  }

  getAllMessageFromDoctorToPatient(doctorId:string, patientId:string): Observable<Message[]>{
    return this.http.get<Message[]>(this.baseUrl+"messages/get-all-patient-messages-from-specific-doctor/"+doctorId+"/"+patientId)
  }

  getAllMessageFromPatientToDoctor(doctorId:string, patientId:string): Observable<Message[]>{
    return this.http.get<Message[]>(this.baseUrl+"messages/get-all-doctor-messages-from-specific-patient/"+doctorId+"/"+patientId)
  }

  onDoctorReadsMessages(doctorId:string, patientId:string): Observable<Message[]>{
    return this.http.post<Message[]>(this.baseUrl+"messages/on-doctor-reads-messages/"+doctorId+"/"+patientId, {});
  }

  onPatientReadsMessages(doctorId:string, patientId:string): Observable<Message[]>{
    return this.http.post<Message[]>(this.baseUrl+"messages/on-patient-reads-messages/"+doctorId+"/"+patientId, {});
  }

  doctorUnreadMessagesCount(doctorId:string): Observable<number>{
    this.http.get<number>(this.baseUrl+"messages/on-doctor-read-messages-count/"+doctorId).subscribe({
      next:(value:number)=>{
        this.unreadDoctorMessagesCount.next(value);
      }
    })
    return this.http.get<number>(this.baseUrl+"messages/on-doctor-read-messages-count/"+doctorId);
  }

  patientUnreadMessagesCount(patientId:string): Observable<number>{
    this.http.get<number>(this.baseUrl+"messages/on-patient-read-messages-count/"+patientId).subscribe({
      next:(value:number)=>{
        this.unreadPatientMessagesCount.next(value);
      }
    })
    return this.http.get<number>(this.baseUrl+"messages/on-patient-read-messages-count/"+patientId);
  }

}
