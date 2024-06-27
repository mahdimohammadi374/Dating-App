import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { HomeListComponent } from './home-list/home-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeListComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ListModule { }
