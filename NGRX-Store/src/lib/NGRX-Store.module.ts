import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from "@ngrx/store";
import { UserEffects } from './User-Store/user.effects';
import { USER_API_ENDPOINT } from './User-Store/user.token';

import * as fromUser from './User-Store/user.reducers';


@NgModule({
  imports: [CommonModule,
    StoreModule.forFeature(
      fromUser.USER_FEATURE_KEY,
      fromUser.userReducer
    ),
    EffectsModule.forFeature([UserEffects]),
    ],
    providers: [
      { provide: USER_API_ENDPOINT, useValue: '' }
    ]
  })

export class NGRXStoreModule {}
