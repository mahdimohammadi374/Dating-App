import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {TabsModule} from 'ngx-bootstrap/tabs'
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ShowEnumPipe } from './_pipes/show-enum.pipe';
import { TimeagoModule } from "ngx-timeago";
import { MemberCardSharedComponent } from './_components/member-card-shared/member-card-shared.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    ShowEnumPipe,
    MemberCardSharedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right",
      timeOut:5000,
      progressBar:true,
      progressAnimation:'increasing'
    }),
    TabsModule.forRoot(),
    NgxGalleryModule ,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TimeagoModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports:[
    ToastrModule,
    TabsModule,
    NgxGalleryModule ,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule,
    PaginationModule,
    ShowEnumPipe,
    TimeagoModule,
    MemberCardSharedComponent,
    ModalModule
  ]
})
export class SharedModule { }
