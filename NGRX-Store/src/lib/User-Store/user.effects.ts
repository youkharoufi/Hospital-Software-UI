import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UserService } from './user.service';
import { ApplicationUser } from '../Models/applicationUser.model';
import { BehaviorSubject, of } from 'rxjs';


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

//   showLoginError$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(AccountActions.loginAccountFailure),
//     tap(() => {
//       this.messageService.add({key:"loginFailure", severity:'error', summary: 'Error', detail: 'Login Failed! Invalid credentials'});
//     })
//   ), { dispatch: false }
// );

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
        this.backend.registerDoctor(action.registerPatientUser).pipe(
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

//   showRegisterError$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(AccountActions.registerAccountFailure),
//     tap(() => {
//       console.log("mermelak");
//       this.messageService.add({key:"registerSuccess", severity:'success', summary: 'Success', detail: 'You have been registered successfully !'});
//     })
//   ), { dispatch: false }
// );

// showRegisterSuccess$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(AccountActions.registerAccountSuccess),
//     tap(() => {
//       this.messageService.add({key:"registerSuccess", severity:'success', summary: 'Success', detail: 'You have been registered successfully'});
//     })
//   ), { dispatch: false }
// );


  constructor(private actions$: Actions, private backend: UserService) { }

        }
