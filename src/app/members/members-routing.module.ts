import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMemberComponent } from './home-member/home-member.component';
import { ListMemberComponent } from './list-member/list-member.component';
import { DetailMemberComponent } from './detail-member/detail-member.component';
import { GetMemberResolver } from '../_resolvers/get-member.resolver';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { PreventUnsavedChangesGuard } from '../_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path:"" , component:HomeMemberComponent , children:[
    {path:"" , component:ListMemberComponent},
    {path:'edit' , component:EditMemberComponent, pathMatch:"full",canDeactivate:[PreventUnsavedChangesGuard]},
    {path:":username" , component:DetailMemberComponent , resolve:{member:GetMemberResolver}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
