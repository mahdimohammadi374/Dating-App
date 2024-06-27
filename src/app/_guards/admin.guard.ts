import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../_models/account.models';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private _service: AccountService, private toast: ToastrService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {


   return this._service.currentUser$.pipe(map((user)=>{
    if(user?.roles?.includes('admin') || user?.roles?.includes("superAdmin")){
      return true;
    }
    this.toast.error("You Are Not Admin");
    return false
   }))
  }
}
