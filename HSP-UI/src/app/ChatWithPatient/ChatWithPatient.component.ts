import { Component, OnInit } from '@angular/core';
import { ApplicationUser, ChatService, Message, UserFacade } from '@hsi/NGRX-Store';

@Component({
  selector: 'hsi-chat-with-patient',
  templateUrl: './ChatWithPatient.component.html',
  styleUrl: './ChatWithPatient.component.scss',
})
export class ChatWithPatientComponent implements OnInit{

  patients$ = this.userFacade.allPatients$;
  patients!:ApplicationUser[];
  filteredPatients : ApplicationUser[] = []
  user!:ApplicationUser;

  receivedMessages: Message[] = [];
  sentMessages: Message[] = [];

  patient?:ApplicationUser;

  combinedMessages: Message[] = [];

  messageContent:string="";

  searchForPatient = "";

  unreadDoctorMessagesCount$ = this.chatService.unreadDoctorMessagesCount$;

  readMessages!:Message[];

  constructor(private userFacade: UserFacade, private chatService: ChatService){}

  ngOnInit(): void{

    this.userFacade.getAllPatients();

    this.patients$.subscribe({
      next:(pats?:ApplicationUser[])=>{
        this.patients = pats!;
        this.filteredPatients = [...this.patients];
      }
    })

    const localStoring = JSON.parse(localStorage.getItem('user')!);

    if(localStoring !== undefined && localStoring !== null){
      this.user = localStoring;
    }

    if(this.patient !== undefined && this.patient !== null){
      this.chatService.getAllMessageFromPatientToDoctor(this.patient?.id, this.user.id).subscribe({
        next:(value:Message[])=>{
          this.receivedMessages = value;
        }
      });

      this.chatService.getAllMessageFromDoctorToPatient(this.patient?.id, this.user.id).subscribe({
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
    this.patient= doctor;

    this.chatService.getAllMessageFromPatientToDoctor(this.patient.id, this.user.id).subscribe({
      next:(value:Message[])=>{
        this.receivedMessages = value;
        this.combineAndSortMessages();
      }
    });

    this.chatService.getAllMessageFromDoctorToPatient(this.patient?.id, this.user.id).subscribe({
      next:(value:Message[])=>{
        this.sentMessages = value;
        this.combineAndSortMessages();
      }
    });

    this.chatService.onDoctorReadsMessages(this.user?.id, this.patient?.id).subscribe({
      next:(value: Message[])=>{
        this.readMessages = value;

        this.chatService.doctorUnreadMessagesCount(this.user.id).subscribe({
          next:(value:number)=>{
            if(value === 0) return;

            console.log("length :"+this.readMessages.length+" value : "+value)
            this.chatService.updateDoctorUnreadMessagesCount(this.readMessages.length - value)

          }
        })
      }
    });


  }

  sendMessage(){
    const messageFromForm = new FormData();
    messageFromForm.append('content', this.messageContent);

    const newMessage = {
      senderId: this.user.id,
      receivingId: this.patient!.id,
      content: this.messageContent,
      time: new Date()
    }

    if(this.messageContent !== ""){
      this.chatService.sendMessageFromPatientToDoctor(this.patient?.id, this.user.id, messageFromForm).subscribe({
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


  filterSearch(searchInput: string) {
    if (!searchInput) {
      this.filteredPatients = [...this.patients];
    } else {
      this.filteredPatients = this.patients.filter((d) =>
        d.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
        d.lastname.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
  }


}

