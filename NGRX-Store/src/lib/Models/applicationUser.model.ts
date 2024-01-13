export interface ApplicationUser{
  id:string;
  firstname:string;
  lastname:string;
  badgeNumber:number;
  roleName:string;
  pictureUrl:string;
  token?:string;
  speciality?:string;
}
