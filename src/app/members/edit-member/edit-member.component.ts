import { ToastrService } from 'ngx-toastr';
import { IPreventUnsavedChanges } from './../../_guards/prevent-unsaved-changes.guard';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, finalize } from 'rxjs';
import { IUser } from 'src/app/_models/account.models';
import { IMember } from 'src/app/_models/member';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { ConfirmService } from 'src/app/_services/confirm.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css'],
})
export class EditMemberComponent implements OnInit, IPreventUnsavedChanges {
  currentUser!: IUser;
  member!: IMember;
  resultSuccess:boolean=false;
  form: FormGroup = new FormGroup({});
  errors: [] = [];
  loading: boolean = false;
  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private toastr: ToastrService,
    private confirmService: ConfirmService
  ) {}
  canDeactivate(): boolean | Observable<boolean> {
    if (this.form.dirty && !this.resultSuccess) {
      return this.confirmService.confirm();
    } else {
      return true;
    }
  }
  ngOnInit(): void {
    this.loadUser();
    this.loadMember();
  }

  onSubmit() {
    this.loading = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.loading = false;
      return;
    }
    this.memberService
      .updateMember(this.form.value)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response: IMember) => {
          this.errors = [];
          this.member = response;
          this.resultSuccess=true;
          this.toastr.success('Updated successfully');
        },
        error: (error) => {
          this.errors = error;
        },
      });
  }

  //PRIVATE METHODS
  private loadMember() {
    this.memberService
      .getMemberByUserName(this.currentUser.username)
      .subscribe({
        next: (response) => {
          this.member = response;

          this.form = new FormGroup({
            introduction: new FormControl(response.introduction),
            email: new FormControl(response.email),
            dateOfBirth: new FormControl(response.dateOfBirth),
            lookingFor: new FormControl(response.lookingFor),
            knownAs: new FormControl(response.knownAs),
            city: new FormControl(response.city),
            country: new FormControl(response.country),
            interests: new FormControl(response.interests),
            // age:new FormControl(response.age),
          });
        },
      });
  }

  private loadUser() {
    this.accountService.currentUser$.subscribe({
      next: (response) => {
        if (response) {
          this.currentUser = response;
        }
      },
    });
  }
}
