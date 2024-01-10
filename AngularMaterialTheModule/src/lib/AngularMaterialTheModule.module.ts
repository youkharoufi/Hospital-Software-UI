import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular Material Imports :
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  imports: [CommonModule, MatExpansionModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule,
    MatToolbarModule],
  exports: [MatExpansionModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule,
    MatToolbarModule],
})
export class AngularMaterialTheModule {}
