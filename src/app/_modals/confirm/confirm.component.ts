import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
@Output() result=new EventEmitter<boolean>();
title:string='';
msg:string='';
btnCancelTxt:string='';
btnOkTxt:string='';

constructor(public bsModalRef:BsModalRef){}

confirm(){
  this.result.emit(true);
  this.bsModalRef.hide();
}
decline(){
  this.result.emit(false);
  this.bsModalRef.hide();
}
}
