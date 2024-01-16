import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationUser, ChatService, Message, UserFacade } from '@hsi/NGRX-Store';

@Component({
  selector: 'hsi-chat-menu',
  templateUrl: './ChatMenu.component.html',
  styleUrl: './ChatMenu.component.scss',
})
export class ChatMenuComponent implements OnInit, OnDestroy{

  doctors$ = this.userFacade.allDocs$;
  doctors!:ApplicationUser[];
  filteredDoctors : ApplicationUser[] = []
  user!:ApplicationUser;

  receivedMessages: Message[] = [];
  sentMessages: Message[] = [];

  doctor?:ApplicationUser;

  combinedMessages: Message[] = [];

  messageContent:string="";

  private hubConnection!: signalR.HubConnection;

  searchForDoctor = "";

  constructor(private userFacade: UserFacade, private chatService: ChatService){}

  ngOnInit(): void{

    this.userFacade.getAllDoctors();

    this.doctors$.subscribe({
      next:(value?:ApplicationUser[])=>{
        this.doctors = value!;
        this.filteredDoctors = [...this.doctors];
      }
    })

    const localStoring = JSON.parse(localStorage.getItem('user')!);

    if(localStoring !== undefined && localStoring !== null){
      this.user = localStoring;
    }

    if(this.doctor !== undefined && this.doctor !== null){
      this.chatService.getAllMessageFromDoctorToPatient(this.doctor?.id, this.user.id).subscribe({
        next:(value:Message[])=>{
          this.receivedMessages = value;
        }
      });

      this.chatService.getAllMessageFromPatientToDoctor(this.doctor?.id, this.user.id).subscribe({
        next:(value:Message[])=>{
          this.sentMessages = value;
        }
      })
    }


  }

  combineAndSortMessages(): void {
    // Combine messages
    this.combinedMessages = [...this.receivedMessages, ...this.sentMessages];
    // Sort messages by timestamp
    this.combinedMessages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }

  setUserToChatWith(doctor:ApplicationUser){
    this.doctor= doctor;

    this.chatService.getAllMessageFromDoctorToPatient(this.doctor.id, this.user.id).subscribe({
      next:(value:Message[])=>{
        this.receivedMessages = value;
        this.combineAndSortMessages();
      }
    });

    this.chatService.getAllMessageFromPatientToDoctor(this.doctor?.id, this.user.id).subscribe({
      next:(value:Message[])=>{
        this.sentMessages = value;
        this.combineAndSortMessages();
      }
    });

    this.chatService.onDoctorReadsMessages(this.doctor?.id, this.user.id).subscribe({
      next:()=>{
        console.log("Messages Read");
      }
    })
  }

  sendMessage(){
    console.log(this.messageContent);
    const messageFromForm = new FormData();
    messageFromForm.append('content', this.messageContent);

    const newMessage = {
      senderId: this.user.id,
      receivingId: this.doctor!.id,
      content: this.messageContent,
      time: new Date()
    }

    if(this.messageContent !== ""){
      this.chatService.sendMessageFromPatientToDoctor(this.doctor?.id, this.user.id, messageFromForm).subscribe({
        next:()=>{
          this.sentMessages.push(newMessage); // Add the new message to the sent messages list
          this.combineAndSortMessages();
          this.messageContent = '';
        }
      });
    }else{
      console.log("test3");
      console.log("No message sent")
    }
  }

  ngOnDestroy() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  filterSearch(searchInput: string) {
    if (!searchInput) {
      this.filteredDoctors = [...this.doctors];
    } else {
      this.filteredDoctors = this.doctors.filter((d) =>
        d.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
        d.lastname.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
  }


}
