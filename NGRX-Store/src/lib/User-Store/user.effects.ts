import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UserService } from './user.service';
import { ApplicationUser } from '../Models/applicationUser.model';
import { BehaviorSubject, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/SnackBar.component';


@Injectable()
export class UserEffects {


  private currentUserSource = new BehaviorSubject<ApplicationUser | null>(null);
  public currentUser$ = this.currentUserSource.asObservable();

  setCurrentUser(user: ApplicationUser) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUserAction),
      switchMap((action) =>
        this.backend.login(action.loginUser).pipe(
          tap((user:ApplicationUser) => {
            if (user!==null) {
              console.log(user);
              this.setCurrentUser(user);
            }
          }),
            map((loggedUser: ApplicationUser) =>
              UserActions.loginUserSuccess({ loggedUser })
            ),
            catchError((error) =>
              of(UserActions.loginUserFailure({ error }))
            )

        )
      )
      )
  );

  showLoginError$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.loginUserFailure),
    tap(() => {
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 5000,
      });
    })
  ), { dispatch: false }
);

// showLoginSuccess$ = createEffect(() =>
// this.actions$.pipe(
//   ofType(AccountActions.loginAccountSuccess),
//   tap(() => {
//     this.messageService.add({key:"loginSuccess", severity:'success', summary: 'Success', detail: 'You are logged in successfully !'});
//   })
// ), { dispatch: false }
// );


  registerAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerAdminUserAction),
      switchMap((action) =>
        this.backend.registerAdmin(action.registerAdminUser).pipe(
          map((registeredAdminUser: ApplicationUser) =>
            UserActions.registerAdminUserSuccess({ registeredAdminUser })
          ),
          catchError((error) =>
            of(UserActions.registerAdminUserFailure({ error }))
          )

        )
      )
    )
  );

  registerDoctor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerDoctorUserAction),
      switchMap((action) =>
        this.backend.registerDoctor(action.registerDoctorUser).pipe(
          map((registeredDoctorUser: ApplicationUser) =>
            UserActions.registerDoctorUserSuccess({ registeredDoctorUser })
          ),
          catchError((error) =>
            of(UserActions.registerDoctorUserFailure({ error }))
          )

        )
      )
    )
  );

  registerPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerPatientUserAction),
      switchMap((action) =>
        this.backend.registerPatient(action.registerPatientUser).pipe(
          map((registeredPatientUser: ApplicationUser) =>
            UserActions.registerPatientUserSuccess({ registeredPatientUser })
          ),
          catchError((error) =>
            of(UserActions.registerPatientUserFailure({ error }))
          )

        )
      )
    )
  );

  showPatientRegisterError$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.registerPatientUserFailure),
    tap(() => {
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 5000,
      });
    })
  ), { dispatch: false }
);

getAllDoctors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getAllDoctors),
      switchMap(() =>
        this.backend.getAllDoctors().pipe(
          map((allDocs: ApplicationUser[]) =>
            UserActions.getAllDoctorsSuccess({ allDocs })
          ),
          catchError((error) =>
            of(UserActions.getAllDoctorsFailure({ error }))
          )

        )
      )
    )
  );

  getDoctorsBySpeciality$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getDoctorsBySpeciality),
      switchMap((action) =>
        this.backend.getDoctorsBySpeciality(action.spe).pipe(
          map((filteredDocs: ApplicationUser[]) =>
            UserActions.getDoctorsBySpecialitySuccess({ filteredDocs })
          ),
          catchError((error) =>
            of(UserActions.getDoctorsBySpecialityFailure({ error }))
          )

        )
      )
    )
  );

  getDoctorsById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getDoctorsById),
      switchMap((action) =>
        this.backend.getDoctorsById(action.id).pipe(
          map((filteredDoctor: ApplicationUser) =>
            UserActions.getDoctorsByIdSuccess({ filteredDoctor })
          ),
          catchError((error) =>
            of(UserActions.getDoctorsByIdFailure({ error }))
          )

        )
      )
    )
  );



  constructor(private actions$: Actions, private backend: UserService, private _snackBar: MatSnackBar) { }

        }
