import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IMember } from 'src/app/_models/member';
import { MemberService } from 'src/app/_services/member.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card-shared',
  templateUrl: './member-card-shared.component.html',
  styleUrls: ['./member-card-shared.component.css'],
})
export class MemberCardSharedComponent {
  @Input() member!: IMember;
  constructor(
    private memberService: MemberService,
    private toast: ToastrService,
    public presenceService:PresenceService
  ) {}

  onAddLike() {
    this.memberService.addLike(this.member.userName).subscribe(() => {
      this.toast.success('You liked ' + this.member.userName);
    });
  }
}
