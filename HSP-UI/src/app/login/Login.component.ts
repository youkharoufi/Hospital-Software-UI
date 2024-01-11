import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationUser, LoginUser, RegisterUser, UserFacade } from '@hsi/NGRX-Store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hsi-login',
  templateUrl: './Login.component.html',
  styleUrl: './Login.component.scss',
})
export class LoginComponent implements OnDestroy{

  loginUser : LoginUser = {
    userName:'',
    password:''
  };

  registerPatientUser: RegisterUser = {
    firstname:'',
    lastname:'',
    password:'',
    roleName:'Patient',
    pictureUrl:''
  }

  passwordConfirmation!:string;

  pic!:string;

  selectedFile?: File;

  user!: ApplicationUser;

  private loginStatusSubscription?: Subscription;
  private registerStatusSubscription?: Subscription;

  @ViewChild('registerForm') registerForm!: NgForm;
  @ViewChild('loginForm') loginForm!: NgForm;



  constructor(private userFacade : UserFacade, private router: Router){}

  login(){

    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }

    this.userFacade.login(this.loginUser)

    this.loginStatusSubscription = this.userFacade.status$.subscribe({
      next:(st?:string)=>{
        if(st === 'success'){
          this.router.navigateByUrl('/home');

        }else{
          console.log("Login failed");
          this.resetLoginForm();
        }
      }
    })


  }

  resetLoginForm() {
    // Reset model data
    this.loginUser = {
      userName: '',
      password: '',
    };

    // Reset form state
    if (this.loginForm) {
      this.loginForm.resetForm();
    }
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
    this.userFacade.login(regUserPatient)

    this.userFacade.status$.subscribe({
      next:(st?:string)=>{
        if(st === 'success'){
          this.router.navigateByUrl('/home');
        }else{
          console.log("Login failed");
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
        if(regStatus === 'success'){
          this.registerLogin(loginUserCustom);
        }else{
          console.log("Login Failure");
          this.resetRegisterForm();
        }
      }
    })
  }

  ngOnDestroy() {

    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }

    if(this.registerStatusSubscription){
      this.registerStatusSubscription.unsubscribe();
    }
  }
}
