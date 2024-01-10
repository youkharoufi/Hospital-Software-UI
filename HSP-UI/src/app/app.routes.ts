import { Route } from '@angular/router';
import { LoginComponent } from './login/Login.component';
import { HomeComponent } from './Home/Home.component';

export const appRoutes: Route[] = [
  {path:'start-menu', component:LoginComponent},
  {path:'home', component:HomeComponent}
];
