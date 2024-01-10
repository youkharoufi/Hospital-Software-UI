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

  pic='';

  selectedFile!: File;


  constructor(private userFacade : UserFacade, private router: Router){}

  login(){
    this.userFacade.login(this.loginUser);

    if(localStorage.getItem('user') !== null)
    this.router.navigateByUrl('/home');
  }

  registerPatient(){
    this.userFacade.registerPatient(this.registerPatientUser);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
        this.selectedFile = input.files[0];
    } else {
        // Handle the case where no file was selected
    }
}


  onRegister() {
    const formData = new FormData();
    formData.append('imageFile', this.selectedFile, this.selectedFile.name);
    // append other RegisterUser data to formData

    // Call your API to register the user
  }
}
