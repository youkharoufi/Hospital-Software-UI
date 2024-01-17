import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApplicationUser, ChatService, SlotService, UserFacade } from '@hsi/NGRX-Store';
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

  doctorAppointments = 0;
  patientAppointments = 0;

  patientUnreadMessagesCount = 0;
  doctorUnreadMessagesCount = 0;

  unreadPatientMessagesCount$ = this.chatService.unreadPatientMessagesCount$;
  unreadDoctorMessagesCount$ = this.chatService.unreadDoctorMessagesCount$;

  slotCountForDoctors$ = this.slotService.slotCountForDocs$;
  slotCountForPatients$ = this.slotService.slotCountForPatients$


  constructor(private userFacade : UserFacade, private cdr: ChangeDetectorRef,
    private router: Router, public dialog: MatDialog, private slotService: SlotService,
    private chatService: ChatService){}

  ngOnInit(): void{

    const localUser = localStorage.getItem('user');
    if (localUser !== null && localUser !== undefined) {
      this.user = JSON.parse(localUser);
      this.userLoaded = true;
      this.cdr.detectChanges();

      this.slotService.getDoctorSlotCount(this.user!.id!).subscribe({
        next:(value:number)=>{
          this.doctorAppointments = value;
        }
      })

      this.slotService.getPatientSlotCount(this.user!.id!).subscribe({
        next:(value:number)=>{
          this.patientAppointments = value;
        }
      });


      this.chatService.patientUnreadMessagesCount(this.user!.id!).subscribe({
        next:(value:number)=>{
          this.patientUnreadMessagesCount = value
        }
      })

      this.chatService.doctorUnreadMessagesCount(this.user!.id!).subscribe({
        next:(value:number)=>{
          this.doctorUnreadMessagesCount = value
        }
      })

    }else{
      this.user$.subscribe({
        next:(usr:ApplicationUser | undefined)=>{
          this.user = usr!;
          this.userLoaded = true;
          this.cdr.detectChanges();

          this.slotService.getDoctorSlotCount(this.user!.id!).subscribe({
            next:(value:number)=>{
              this.doctorAppointments = value;
            }
          })

          this.slotService.getPatientSlotCount(this.user!.id!).subscribe({
            next:(value:number)=>{
              this.patientAppointments = value;
            }
          });

          this.chatService.patientUnreadMessagesCount(this.user!.id!).subscribe({
            next:(value:number)=>{
              this.patientUnreadMessagesCount = value
            }
          })

          this.chatService.doctorUnreadMessagesCount(this.user!.id!).subscribe({
            next:(value:number)=>{
              this.doctorUnreadMessagesCount = value
            }
          })
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
