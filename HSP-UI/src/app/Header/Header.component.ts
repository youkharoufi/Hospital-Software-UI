import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApplicationUser, UserFacade } from '@hsi/NGRX-Store';
import { LoginDialogComponent } from '../Dialogs/LoginDialog/LoginDialog.component';
import { RegisterDialogComponent } from '../Dialogs/RegisterDialog/RegisterDialog.component';

@Component({
  selector: 'hsi-header',
  templateUrl: './Header.component.html',
  styleUrl: './Header.component.scss',
})
export class HeaderComponent implements OnInit{

  user ?: ApplicationUser;
  userLoaded = false;
  user$ = this.userFacade.loggedUser$;

  constructor(private userFacade : UserFacade, private cdr: ChangeDetectorRef,
    private router: Router, public dialog: MatDialog){}

  ngOnInit(): void{

    const localUser = localStorage.getItem('user');
    if (localUser !== null && localUser !== undefined) {
      this.user = JSON.parse(localUser);
      this.userLoaded = true;
      this.cdr.detectChanges();
    }else{
      this.user$.subscribe({
        next:(usr:ApplicationUser | undefined)=>{
          this.user = usr!;
          console.log(this.user);
          this.userLoaded = true;
          this.cdr.detectChanges();
        }
      })
    }



  }


  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');

    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {});

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');

    });
  }

  logout(){
    localStorage.setItem('user', JSON.stringify(null));
    this.router.navigateByUrl('/');
    setTimeout(()=>{
      window.location.reload();
    }, 1000)
  }
}
