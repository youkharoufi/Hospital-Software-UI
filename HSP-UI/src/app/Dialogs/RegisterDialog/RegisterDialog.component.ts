import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginUser, RegisterUser, UserFacade } from '@hsi/NGRX-Store';
import { Subscription } from 'rxjs';
import { ErrorSnackBarComponent } from '../../Snackbars/Error-SnackBar/ErrorSnackBar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'hsi-register-dialog',
  templateUrl: './RegisterDialog.component.html',
  styleUrl: './RegisterDialog.component.scss',
})
export class RegisterDialogComponent {

  registerStatusSubscription!: Subscription;

  registerPatientUser : RegisterUser = {
    firstname:'',
    lastname:'',
    password:'',
    roleName:'Patient',
    pictureUrl:''
  };

  registerForm!: NgForm;

  selectedFile ?: File;

  passwordConfirmation!:string;

  pic='';

  loginStatusSubscription!: Subscription;

  constructor(private router: Router, private userFacade : UserFacade,
    public dialogRef: MatDialogRef<RegisterDialogComponent>, private _snackBar: MatSnackBar){}


  onNoClick(){
    this.resetRegisterForm();
    this.dialogRef.close();
  }

  resetRegisterForm(){
    this.registerPatientUser = {
      firstname:'',
    lastname:'',
    password:'',
    roleName:'Patient',
    pictureUrl:''

    }

    if(this.registerForm){
      this.registerForm.resetForm();
    }
  }

  registerLogin(regUserPatient:LoginUser){

    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }

    this.userFacade.login(regUserPatient)

    this.userFacade.status$.subscribe({
      next:(st?:string)=>{
        if(st === 'success'){
          this.onNoClick();
          this.router.navigateByUrl('/');
        }else{
          this.openSnackBar();
          this.resetRegisterForm();
        }
      }
    })

  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
        this.selectedFile = input.files[0];
    } else {
        // Handle the case where no file was selected
    }
  }


  registerPatient() {


    if(this.registerStatusSubscription){
      this.registerStatusSubscription.unsubscribe();
    }

    const loginUserCustom : LoginUser = {
      userName:this.registerPatientUser.firstname,
      password:this.registerPatientUser.password
    };

    const formData = new FormData();
    formData.append('imageFile', this.selectedFile!, this.selectedFile!.name);
    formData.append('firstname', this.registerPatientUser.firstname);
    formData.append('lastname', this.registerPatientUser.lastname);
    formData.append('roleName', this.registerPatientUser.roleName);
    formData.append('password', this.registerPatientUser.password);

    this.userFacade.registerPatient(formData);

    this.registerStatusSubscription = this.userFacade.registrationStatus$.subscribe({
      next:(regStatus?:string)=>{
        setTimeout(()=>{
          if(regStatus === 'success'){
            this.registerLogin(loginUserCustom);

        }}, 2000);

      },
      error: () => {
        this.resetRegisterForm();
            this.onNoClick();
      }
    })
  }

  openSnackBar() {
    this._snackBar.openFromComponent(ErrorSnackBarComponent, {
      duration:5000
    });
  }

  ngOnDestroy() {


    if(this.registerStatusSubscription){
      this.registerStatusSubscription.unsubscribe();
    }

    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }


}
