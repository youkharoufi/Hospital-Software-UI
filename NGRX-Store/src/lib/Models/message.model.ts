export interface Message{
  id?:string;
  senderId:string;
  receivingId:string;
  time:Date;
  content:string;
}
