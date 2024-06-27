import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { AccountService } from '../_services/account.service';
import { IUser } from '../_models/account.models';
import { first } from 'rxjs';

@Directive({
  selector: '[appHasInRole]',
})
export class HasInRoleDirective implements OnInit {
  @Input() appHasInRole: string[];
  user: IUser | null;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.accountService.currentUser$.pipe(first()).subscribe({
      next: (response) => {
        this.user = response;
        if (
          this.user?.roles?.some((role) => this.appHasInRole.includes(role))
        ) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        } 
      },
    });
  }
}
