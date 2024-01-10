import { Component, OnInit } from '@angular/core';
import { ApplicationUser, UserFacade } from '@hsi/NGRX-Store';

@Component({
  selector: 'hsi-header',
  templateUrl: './Header.component.html',
  styleUrl: './Header.component.scss',
})
export class HeaderComponent implements OnInit{

  user$ = this.userFacade.loggedUser$;
  user!: ApplicationUser;

  constructor(private userFacade: UserFacade){}

  ngOnInit(): void{

    if(localStorage.getItem('user') !== null){

      this.user = JSON.parse(localStorage.getItem('user')!)
      // this.user$.subscribe({
      //   next:(currentUser?:ApplicationUser) => {
      //     this.user = currentUser!;
      //   },
      //   error:() =>{
      //     console.log("An error occured : No User Connected...")
      //   }
      // })
    }
  }
}