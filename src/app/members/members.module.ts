import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';

import { HomeMemberComponent } from './home-member/home-member.component';
import { DetailMemberComponent } from './detail-member/detail-member.component';
import { ListMemberComponent } from './list-member/list-member.component';
import { CardMemberComponent } from './card-member/card-member.component';
import { SharedModule } from '../shared/shared.module';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { PhotoEditComponent } from './photo-edit/photo-edit.component';
import { FormsModule } from '@angular/forms';
import { MessageMemberComponent } from './message-member/message-member.component';
@NgModule({
  declarations: [
    HomeMemberComponent,
    DetailMemberComponent,
    ListMemberComponent,
    CardMemberComponent,
    EditMemberComponent,
    PhotoEditComponent,
    MessageMemberComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class MembersModule { }
