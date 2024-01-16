import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginUser, UserFacade } from '@hsi/NGRX-Store';
import { Subscription } from 'rxjs';
import { ErrorSnackBarComponent } from '../../Snackbars/Error-SnackBar/ErrorSnackBar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'hsi-login-dialog',
  templateUrl: './LoginDialog.component.html',
  styleUrl: './LoginDialog.component.scss',
})
export class LoginDialogComponent {

  loginUser : LoginUser = {
    userName:'',
    password:''
  };

  private loginStatusSubscription?: Subscription;

  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    private userFacade : UserFacade, private router: Router, private _snackBar: MatSnackBar){}

  onNoClick(): void {
    this.dialogRef.close();
  }


  login(){

    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }

    this.userFacade.login(this.loginUser)

    this.loginStatusSubscription = this.userFacade.status$.subscribe({
      next:(st?:string)=>{
        if(st === 'success'){
          this.onNoClick();
          window.location.reload();
          this.router.navigateByUrl('/');

        }
      },
      error:()=>{

        this.openSnackBar();
        this.resetLoginForm();
      }

      })
    }

  resetLoginForm() {
    this.loginUser = {
      userName: '',
      password: '',
    };

    if (this.loginForm) {
      this.loginForm.resetForm();
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(ErrorSnackBarComponent, {
      duration:5000
    });
  }

  ngOnDestroy() {

    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }
}
