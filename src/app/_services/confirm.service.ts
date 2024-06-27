import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { initialState } from 'ngx-bootstrap/timepicker/reducer/timepicker.reducer';
import { ConfirmComponent } from '../_modals/confirm/confirm.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  confirm(
    title: string = 'confirmation',
    msg: string = 'Are you Sure?',
    btnOkTxt: string = 'Yes',
    btnCancelTxt: string = 'No'
  ) {
    const config={
      title:title,
      class:"modal-dialog-centered",
      initialState:{
        title,
        msg,
        btnCancelTxt,
        btnOkTxt
      } as any

    }
    this.bsModalRef=this.modalService.show(ConfirmComponent , config)
    return this.bsModalRef.content.result as Observable<boolean>;
  }
}
