import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser, UserFacade } from '@hsi/NGRX-Store';
import { Subscription } from 'rxjs';
import { ErrorSnackBarComponent } from '../../Snackbars/Error-SnackBar/ErrorSnackBar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'hsi-register-doctor',
  templateUrl: './RegisterDoctor.component.html',
  styleUrl: './RegisterDoctor.component.scss',
})
export class RegisterDoctorComponent {

  registerStatusSubscription!: Subscription;

  registerUser : RegisterUser = {
    firstname:'',
    lastname:'',
    password:'',
    roleName:'',
    pictureUrl:'',
    speciality:''
  };

  registerForm!: NgForm;

  selectedFile ?: File;

  passwordConfirmation!:string;

  pic='';
  specialities = ["Cardiology", "Dental", "General Medecine", "Traumatology", "Pediatric", "Neurology", "Gynecology"]

  constructor(private userFacade: UserFacade, private router: Router, private _snackBar: MatSnackBar){}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
        this.selectedFile = input.files[0];
    } else {
        // Handle the case where no file was selected
    }
  }

  resetRegisterForm(){
    this.registerUser = {
      firstname:'',
    lastname:'',
    password:'',
    roleName:'',
    pictureUrl:'',
    speciality:''

    }

    if(this.registerForm){
      this.registerForm.resetForm();
    }
  }

  registerDoctor() {


    if(this.registerStatusSubscription){
      this.registerStatusSubscription.unsubscribe();
    }

    const formData = new FormData();
    formData.append('imageFile', this.selectedFile!, this.selectedFile!.name);
    formData.append('firstname', this.registerUser.firstname);
    formData.append('lastname', this.registerUser.lastname);
    formData.append('roleName', this.registerUser.roleName);
    formData.append('password', this.registerUser.password);
    formData.append('speciality', this.registerUser.speciality!);


    if(this.registerUser.roleName === 'Doctor'){
      this.userFacade.registerDoctor(formData);

    }else if(this.registerUser.roleName === 'Patient'){
      this.registerUser.speciality = "";
      this.userFacade.registerPatient(formData);
    }else if(this.registerUser.roleName === 'Admin'){
      this.registerUser.speciality = "";
      this.userFacade.registerDoctor(formData);
    }
    this.registerStatusSubscription = this.userFacade.registrationStatus$.subscribe({
      next:(regStatus?:string)=>{
        setTimeout(()=>{
          if(regStatus === 'success'){
            this.router.navigateByUrl('/');

        }}, 2000);

      },
      error: () => {
        this.openSnackBar();
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
  }

}
