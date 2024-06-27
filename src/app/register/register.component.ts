import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchPasswordService } from '../_validators/match-password.service';
import { UniqueUsernameService } from '../_services/unique-username.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { animation } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required , [this.uniqueUsername.validate.bind(this.uniqueUsername)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    knownAs: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('', [
      Validators.required
    ]),
    country: new FormControl('', [
      Validators.required
    ]),
    dateOfBirth: new FormControl('', [Validators.required]),
    gender: new FormControl('0', [Validators.required]),
  },{validators:[this.matchPassword.validate.bind(this.matchPassword)]});

  bsConfig:Partial<BsDatepickerConfig>;
  maxDate:Date=new Date();


  constructor(
    private accountService: AccountService,
    private router: Router,
    private toast: ToastrService,
    private matchPassword:MatchPasswordService,
    private uniqueUsername:UniqueUsernameService
  ) {
    this.bsConfig=Object.assign({},{
      containerClass:'theme-dark-blue',
      dateInputFormat:"DD/MM/YYYY",
      Animation:'true',
    })
  }
  onSubmit() {
    this.accountService.register(this.form.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/members');
        this.toast.success( 'You are registered successfully',"success" );
      }
    });
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }
  onCancel() {
    this.cancel.emit();
  }
  showValidatorForMatchPassword() {
    return (
      this.form.dirty &&
      this.form.get('password')!.touched &&
      this.form.get('passwordConfirm')!.touched &&
      this.form.get('password')!.dirty &&
      this.form.get('passwordConfirm')!.dirty &&
      this.form.errors
    );
  }
}
