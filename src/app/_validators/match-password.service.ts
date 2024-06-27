import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MatchPasswordService implements Validator {

  constructor() { }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const {password , passwordConfirm}=control.value;
    if(password === passwordConfirm) return null;
    return {matchPassword:true};

  }
  
}
