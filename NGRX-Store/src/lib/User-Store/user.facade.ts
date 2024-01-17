import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromUser from './user.reducers';
import * as UserSelectors from './user.selectors';
import { LoginUser } from '../Models/loginUser.model';
import { getAllDoctors, getAllPatients, getDoctorsById, getDoctorsBySpeciality, loginUserAction, registerAdminUserAction, registerDoctorUserAction, registerPatientUserAction } from './user.actions';

@Injectable({ providedIn: 'root' })
export class UserFacade {

  error$ = this.store.pipe(select(UserSelectors.getAccountError));
  loggedUser$ = this.store.pipe(select(UserSelectors.getLoggedUser));
  status$ = this.store.pipe(select(UserSelectors.getStatus));
  registrationStatus$ = this.store.pipe(select(UserSelectors.getRegistrationStatus));
  allDocs$ = this.store.pipe(select(UserSelectors.getAllDoctors));
  filteredDocs$ = this.store.pipe(select(UserSelectors.getFilteredDoctors));
  filteredDoctor$ = this.store.pipe(select(UserSelectors.getFilteredDoctor));
  allPatients$ = this.store.pipe(select(UserSelectors.getAllPatients))


  constructor(private store: Store<fromUser.UserPartialState>) { }

  login(loginUser: LoginUser) {
    this.store.dispatch(loginUserAction({loginUser}));
  }

  registerAdmin(registerAdminUser: FormData) {
    this.store.dispatch(registerAdminUserAction({ registerAdminUser }));
  }

  registerDoctor(registerDoctorUser: FormData) {
    this.store.dispatch(registerDoctorUserAction({ registerDoctorUser }));
  }

  registerPatient(registerPatientUser: FormData) {
    this.store.dispatch(registerPatientUserAction({ registerPatientUser }));
  }

  getAllDoctors(){
    this.store.dispatch(getAllDoctors())
  }

  getAllPatients(){
    this.store.dispatch(getAllPatients())
  }

  getDoctorsBySpeciality(spe:string){
    this.store.dispatch(getDoctorsBySpeciality({ spe }))
  }

  getDoctorById(id:string){
    this.store.dispatch(getDoctorsById({ id }))
  }

}
