
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardSnackBarComponent } from './GuardSnackBar/GuardSnackBar.component';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {
  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const patient = JSON.parse(localStorage.getItem('user')!);

    if (patient.roleName !== 'Patient') {
      this.router.navigate(['/']);
      this.openSnackBar();
      return false;
    }

    return true;
  }
  openSnackBar() {
    this._snackBar.openFromComponent(GuardSnackBarComponent, {
      duration:5000
    });
  }
}
