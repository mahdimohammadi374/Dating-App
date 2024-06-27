import { MemberService } from 'src/app/_services/member.service';
import { Component, Input } from '@angular/core';
import { IMember } from 'src/app/_models/member';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-member',
  templateUrl: './card-member.component.html',
  styleUrls: ['./card-member.component.css']
})
export class CardMemberComponent {

@Input() member!:IMember;
constructor(private memberService:MemberService , private toast:ToastrService , private router:Router){}



onAddLike() {
  this.memberService.addLike(this.member.userName).subscribe(()=>{
    this.toast.success("You liked " + this.member.userName)

  })
  }

  goToMsg(userName: string) {
    console.log(userName);
    
this.router.navigate(['/members' , userName] )    }
}
