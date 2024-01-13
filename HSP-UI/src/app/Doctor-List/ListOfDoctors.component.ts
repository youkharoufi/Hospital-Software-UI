import { Component, OnInit } from '@angular/core';
import { UserFacade } from '@hsi/NGRX-Store';

@Component({
  selector: 'hsi-list-of-doctors',
  templateUrl: './ListOfDoctors.component.html',
  styleUrl: './ListOfDoctors.component.scss',
})
export class ListOfDoctorsComponent implements OnInit{

  doctors = this.userFacade.allDocs$;


  constructor(private userFacade: UserFacade){}


  ngOnInit(): void{

    this.userFacade.getAllDoctors();
  }

  filterBySpeciality(spe:string){

    this.userFacade.getDoctorsBySpeciality(spe);
    this.doctors = this.userFacade.filteredDocs$;

  }

  noFiltering(){
    this.userFacade.getAllDoctors();
    this.doctors= this.userFacade.allDocs$
  }
}
