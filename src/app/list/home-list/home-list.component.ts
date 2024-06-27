import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { LikeUser, UserLikeParams } from 'src/app/_enums/likeUser';
import { IMember } from 'src/app/_models/member';
import { IPagination } from 'src/app/_models/pagination';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit{

  members:IMember[]=[];
  pagination:IPagination;
  userLikeParams=new UserLikeParams();

  constructor(private memberService:MemberService){}
  ngOnInit(): void {
this.memberService.getUserLikes(this.userLikeParams).subscribe({
  next:(response)=>{
   
      this.members = response.items;
      this.pagination ={
        currentPage:response.currentPage,
        pageSize:response.pageSize,
        totalCount:response.totalCount,
        totalPage:response.totalPage
      };
      console.log(this.members);
      
  }
})
  }

  pageChanged(event: PageChangedEvent) {
    this.userLikeParams.pageNumber=event.page;

  }
}
