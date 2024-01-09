import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as UserActions from './user.actions';
import { ApplicationUser } from '../Models/applicationUser.model';
import { createReducer, on, Action } from '@ngrx/store';

export const USER_FEATURE_KEY = 'user-key';

export interface State extends EntityState<ApplicationUser> {
  selectedId?: string | number;
  loaded: boolean;
  error?: Error;
  loggedUser?:ApplicationUser;
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: State;
}

export const userAdapter: EntityAdapter<ApplicationUser> =
  createEntityAdapter<ApplicationUser>();

export const initialState: State = userAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  loggedUser: undefined
});


export const userReducer = createReducer(
  initialState,


  on(UserActions.loginUserAction, (state, { loginUser }) => ({
    ...state,
    loaded: false,
    error: undefined,
    loginUser
  })),
  on(UserActions.loginUserSuccess, (state, { loggedUser }) =>
    ({ ...state, loaded: true, loggedUser:loggedUser })
  ),
  on(UserActions.loginUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),


  on(UserActions.registerAdminUserAction, (state, { registerAdminUser }) => ({
    ...state,
    loaded: false,
    error: undefined,
    registerAdminUser
  })),
  on(UserActions.registerAdminUserSuccess, (state, { registeredAdminUser }) =>
    ({ ...state, loaded: true, registeredAdminUser })
  ),
  on(UserActions.registerAdminUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(UserActions.registerDoctorUserAction, (state, { registerDoctorUser }) => ({
    ...state,
    loaded: false,
    error: undefined,
    registerDoctorUser
  })),
  on(UserActions.registerDoctorUserSuccess, (state, { registeredDoctorUser }) =>
    ({ ...state, loaded: true, registeredDoctorUser })
  ),
  on(UserActions.registerDoctorUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(UserActions.registerPatientUserAction, (state, { registerPatientUser }) => ({
    ...state,
    loaded: false,
    error: undefined,
    registerPatientUser
  })),
  on(UserActions.registerPatientUserSuccess, (state, { registeredPatientUser }) =>
    ({ ...state, loaded: true, registeredPatientUser })
  ),
  on(UserActions.registerPatientUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),


);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
