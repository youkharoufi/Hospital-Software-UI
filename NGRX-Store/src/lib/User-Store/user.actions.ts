import { createAction, props } from "@ngrx/store";
import { ApplicationUser } from "../Models/applicationUser.model";
import { LoginUser } from "../Models/loginUser.model";
import { RegisterUser } from "../Models/registerUser.model";



export enum UserActionsTypes {

  LOGIN_USER = '[User] Login',
  LOGIN_USER_SUCCESS = '[User/API] Login User Success',
  LOGIN_USER_ERROR = '[User/API] Login User Failure',

  REGISTER_ADMIN_USER = '[User] Register Admin User',
  REGISTER_ADMIN_USER_SUCCESS = '[User/API] Register Admin User Success',
  REGISTER_ADMIN_USER_ERROR = '[User/API] Register Admin User Failure',

  REGISTER_DOCTOR_USER = '[User] Register Doctor User',
  REGISTER_DOCTOR_USER_SUCCESS = '[User/API] Register Doctor User Success',
  REGISTER_DOCTOR_USER_ERROR = '[User/API] Register Doctor User Failure',

  REGISTER_PATIENT_USER = '[User] Register Patient User',
  REGISTER_PATIENT_USER_SUCCESS = '[User/API] Register Patient User Success',
  REGISTER_PATIENT_USER_ERROR = '[User/API] Register Patient User Failure',

  GET_ALL_DOCTORS = '[User] Get All Doctors',
  GET_ALL_DOCTORS_SUCCESS = '[User] Get All Doctors Success',
  GET_ALL_DOCTORS_FAILURE = '[User] Get All Doctors Failure',
}

export const loginUserAction = createAction(
  UserActionsTypes.LOGIN_USER,
  props<{ loginUser: LoginUser }>()
);

export const loginUserSuccess = createAction(
  UserActionsTypes.LOGIN_USER_SUCCESS,
  props<{ loggedUser: ApplicationUser }>()
);

export const loginUserFailure = createAction(
  UserActionsTypes.LOGIN_USER_ERROR,
  props<{ error: Error }>()
);

export const registerAdminUserAction = createAction(
  UserActionsTypes.REGISTER_ADMIN_USER,
  props<{ registerAdminUser: RegisterUser }>()
);

export const registerAdminUserSuccess = createAction(
  UserActionsTypes.REGISTER_ADMIN_USER_SUCCESS,
  props<{ registeredAdminUser: ApplicationUser }>()
);

export const registerAdminUserFailure = createAction(
  UserActionsTypes.REGISTER_ADMIN_USER_ERROR,
  props<{ error: Error }>()
);

export const registerDoctorUserAction = createAction(
  UserActionsTypes.REGISTER_ADMIN_USER,
  props<{ registerDoctorUser: RegisterUser }>()
);

export const registerDoctorUserSuccess = createAction(
  UserActionsTypes.REGISTER_ADMIN_USER_SUCCESS,
  props<{ registeredDoctorUser: ApplicationUser }>()
);

export const registerDoctorUserFailure = createAction(
  UserActionsTypes.REGISTER_ADMIN_USER_ERROR,
  props<{ error: Error }>()
);

export const registerPatientUserAction = createAction(
  UserActionsTypes.REGISTER_PATIENT_USER,
  props<{ registerPatientUser: FormData }>()
);

export const registerPatientUserSuccess = createAction(
  UserActionsTypes.REGISTER_PATIENT_USER_SUCCESS,
  props<{ registeredPatientUser: ApplicationUser }>()
);

export const registerPatientUserFailure = createAction(
  UserActionsTypes.REGISTER_ADMIN_USER_ERROR,
  props<{ error: Error }>()
);

export const getAllDoctors = createAction(
  UserActionsTypes.GET_ALL_DOCTORS
);

export const getAllDoctorsSuccess = createAction(
  UserActionsTypes.GET_ALL_DOCTORS_SUCCESS,
  props<{ allDocs: ApplicationUser[] }>()
);

export const getAllDoctorsFailure = createAction(
  UserActionsTypes.GET_ALL_DOCTORS_FAILURE,
  props<{ error: Error }>()
);

