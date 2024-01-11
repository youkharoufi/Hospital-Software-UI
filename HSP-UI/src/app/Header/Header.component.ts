import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationUser, UserFacade } from '@hsi/NGRX-Store';

@Component({
  selector: 'hsi-header',
  templateUrl: './Header.component.html',
  styleUrl: './Header.component.scss',
})
export class HeaderComponent implements OnInit{

  user!: ApplicationUser;
  userLoaded = false;
  user$ = this.userFacade.loggedUser$;

  constructor(private userFacade : UserFacade, private cdr: ChangeDetectorRef,
    private router: Router){}

  ngOnInit(): void{

    const localUser = localStorage.getItem('user');
    if (localUser) {
      this.user = JSON.parse(localUser);
      this.userLoaded = true;
      this.cdr.detectChanges();
    }

    this.user$.subscribe({
      next:(usr:ApplicationUser | undefined)=>{
        this.user = usr!;
        console.log(this.user);
        this.userLoaded = true;
        this.cdr.detectChanges();
      }
    })

  }

  logout(){
    localStorage.setItem('user', JSON.stringify(null));

    this.router.navigateByUrl('/start-menu');

  }
}
