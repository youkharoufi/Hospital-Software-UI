import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromUser from './user.reducers';
import * as UserSelectors from './user.selectors';
import { LoginUser } from '../Models/loginUser.model';
import { RegisterUser } from '../Models/registerUser.model';
import { loginUserAction, registerAdminUserAction, registerDoctorUserAction, registerPatientUserAction } from './user.actions';

@Injectable({ providedIn: 'root' })
export class UserFacade {

  error$ = this.store.pipe(select(UserSelectors.getAccountError));
  loggedUser$ = this.store.pipe(select(UserSelectors.getLoggedUser));

  constructor(private store: Store<fromUser.UserPartialState>) { }

  login(loginUser: LoginUser) {
    this.store.dispatch(loginUserAction({loginUser}));
  }

  registerAdmin(registerAdminUser: RegisterUser) {
    this.store.dispatch(registerAdminUserAction({ registerAdminUser }));
  }

  registerDoctor(registerDoctorUser: RegisterUser) {
    this.store.dispatch(registerDoctorUserAction({ registerDoctorUser }));
  }

  registerPatient(registerPatientUser: RegisterUser) {
    this.store.dispatch(registerPatientUserAction({ registerPatientUser }));
  }

}
