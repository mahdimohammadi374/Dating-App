import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsernameService implements AsyncValidator {
  exisUsername: boolean = false;
  constructor(private accountService: AccountService) {}
  validate(
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> {
    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => {
        console.log("call api");
        
        return this.accountService.isExistUserName(value);
      }),
      map((response) => {
        console.log(response);
        
        if (response) control.setErrors({ uniqueUsername: true });
        return null;
      })
    );
  }
}
