import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationUser } from '../Models/applicationUser.model';
import { LoginUser } from '../Models/loginUser.model';
import { environment } from '../environments/environment';
import { RegisterUser } from '../Models/registerUser.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.API_URL;


  constructor(private http: HttpClient) { }

  login(loginUser: LoginUser): Observable<ApplicationUser> {

    return this.http.post<ApplicationUser>(this.baseUrl + "userManagement/login", loginUser);
  }

  registerAdmin(registerUser: RegisterUser): Observable<ApplicationUser> {

    return this.http.post<ApplicationUser>(this.baseUrl + "userManagement/register-admin", registerUser);
  }

  registerDoctor(registerUser: RegisterUser): Observable<ApplicationUser> {

    return this.http.post<ApplicationUser>(this.baseUrl + "userManagement/register-doctor", registerUser);
  }

  registerPatient(registerUser: FormData): Observable<ApplicationUser> {

    return this.http.post<ApplicationUser>(this.baseUrl + "userManagement/register-patient", registerUser);
  }

  getAllDoctors(): Observable<ApplicationUser[]> {

    return this.http.get<ApplicationUser[]>(this.baseUrl + "userManagement/all-doctors");
  }

  getDoctorsBySpeciality(spe: string): Observable<ApplicationUser[]>{
    return this.http.get<ApplicationUser[]>(`${this.baseUrl}usermanagement/doctors-by-specialty/${spe}`);
  }


}
