import { createAction, props } from "@ngrx/store";
import { ApplicationUser } from "../Models/applicationUser.model";
import { LoginUser } from "../Models/loginUser.model";



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

  GET_ALL_PATIENTS = '[User] Get All Patients',
  GET_ALL_PATIENTS_SUCCESS = '[User] Get All Patients Success',
  GET_ALL_PATIENTS_FAILURE = '[User] Get All Patients Failure',

  GET_DOCTORS_BY_SPECIALITY = '[User] Get Doctors by speciality',
  GET_DOCTORS_BY_SPECIALITY_SUCCESS = '[User] Get Doctors by speciality Success',
  GET_DOCTORS_BY_SPECIALITY_FAILURE = '[User] Get Doctors by speciality Failure',

  GET_DOCTORS_BY_ID = '[User] Get Doctors by id',
  GET_DOCTORS_BY_ID_SUCCESS = '[User] Get Doctors by id Success',
  GET_DOCTORS_BY_ID_FAILURE = '[User] Get Doctors by id Failure',
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
  props<{ registerAdminUser: FormData }>()
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
  UserActionsTypes.REGISTER_DOCTOR_USER,
  props<{ registerDoctorUser: FormData }>()
);

export const registerDoctorUserSuccess = createAction(
  UserActionsTypes.REGISTER_DOCTOR_USER_SUCCESS,
  props<{ registeredDoctorUser: ApplicationUser }>()
);

export const registerDoctorUserFailure = createAction(
  UserActionsTypes.REGISTER_DOCTOR_USER_ERROR,
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
  UserActionsTypes.REGISTER_PATIENT_USER_ERROR,
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

export const getAllPatients = createAction(
  UserActionsTypes.GET_ALL_PATIENTS
);

export const getAllPatientsSuccess = createAction(
  UserActionsTypes.GET_ALL_PATIENTS_SUCCESS,
  props<{ allPatients: ApplicationUser[] }>()
);

export const getAllPatientsFailure = createAction(
  UserActionsTypes.GET_ALL_PATIENTS_FAILURE,
  props<{ error: Error }>()
);

export const getDoctorsBySpeciality = createAction(
  UserActionsTypes.GET_DOCTORS_BY_SPECIALITY,
  props<{ spe: string}>()
);

export const getDoctorsBySpecialitySuccess = createAction(
  UserActionsTypes.GET_DOCTORS_BY_SPECIALITY_SUCCESS,
  props<{ filteredDocs: ApplicationUser[] }>()
);

export const getDoctorsBySpecialityFailure = createAction(
  UserActionsTypes.GET_DOCTORS_BY_SPECIALITY_FAILURE,
  props<{ error: Error }>()
);

export const getDoctorsById = createAction(
  UserActionsTypes.GET_DOCTORS_BY_ID,
  props<{ id: string}>()
);

export const getDoctorsByIdSuccess = createAction(
  UserActionsTypes.GET_DOCTORS_BY_ID_SUCCESS,
  props<{ filteredDoctor: ApplicationUser }>()
);

export const getDoctorsByIdFailure = createAction(
  UserActionsTypes.GET_DOCTORS_BY_ID_FAILURE,
  props<{ error: Error }>()
);

