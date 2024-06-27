import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/_models/account.models';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css'],
})
export class RolesModalComponent implements OnInit {
  @Output() updatedRoles=new EventEmitter<any>()
  title=""
  user: IUser;
  closeBtnname = 'close';
  roles: any[] = [];
  constructor(public modalRef: BsModalRef , private toast:ToastrService) {}
  ngOnInit(): void {}

  changeUpdatedRoles(){
    this.updatedRoles.emit(this.roles);
    this.modalRef.hide();
    this.toast.success('roles updated');
  }
}
