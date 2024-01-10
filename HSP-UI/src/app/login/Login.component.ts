import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser, RegisterUser, UserFacade } from '@hsi/NGRX-Store';

@Component({
  selector: 'hsi-login',
  templateUrl: './Login.component.html',
  styleUrl: './Login.component.scss',
})
export class LoginComponent {

  loginUser : LoginUser = {
    userName:'',
    password:''
  };

  registerPatientUser: RegisterUser = {
    firstname:'',
    lastname:'',
    password:'',
    roleName:'Patient'
  }

  passwordConfirmation= '';

  constructor(private userFacade : UserFacade, private router: Router){}

  login(){
    this.userFacade.login(this.loginUser);

    if(localStorage.getItem('user') !== null)
    this.router.navigateByUrl('/home');


  }

  registerPatient(){
    this.userFacade.registerPatient(this.registerPatientUser);


  }
}
