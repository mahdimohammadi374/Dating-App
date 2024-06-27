import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MemberService } from '../_services/member.service';
import { IMember } from '../_models/member';

@Injectable({
  providedIn: 'root',
})
export class GetMemberResolver implements Resolve<IMember> {
  constructor(private memberService: MemberService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IMember> {
    return this.memberService.getMemberByUserName(route.params['username']);
  
  }
}
