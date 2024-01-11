import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './User-Store/user.effects';
import { USER_API_ENDPOINT } from './User-Store/user.token';

import * as fromUser from './User-Store/user.reducers';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './components/SnackBar.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUser.USER_FEATURE_KEY, fromUser.userReducer),
    EffectsModule.forFeature([UserEffects]),

    //Angular Material:
    MatSnackBarModule,
  ],
  providers: [{ provide: USER_API_ENDPOINT, useValue: '' }],
  declarations: [SnackBarComponent],
})
export class NGRXStoreModule {}
