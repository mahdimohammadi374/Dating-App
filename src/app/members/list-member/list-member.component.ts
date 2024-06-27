import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable, map } from 'rxjs';
import { Gender, IMember, OrderBy, TypeSort, userParams } from 'src/app/_models/member';
import { IPagination, PaginatedResult } from 'src/app/_models/pagination';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.css']
})
export class ListMemberComponent implements OnInit{

members:IMember[]=[];
pagination:IPagination;
params:userParams;
genders=Gender;
typeSort=TypeSort;
orderBy=OrderBy
constructor(private memberService:MemberService){
  this.params=this.memberService.getUserParams();
}
  ngOnInit(): void {
  this.loadMember();
  }
  


  pageChanged(event: PageChangedEvent) {
    this.params.pageNumber=event.page;
    this.memberService.setUserParams(this.params);
    this.loadMember()
    }
    private loadMember() {
      this.memberService.getMembers(this.params ).subscribe({
        next: ((response) => {
          this.members = response.items;
          this.pagination ={
            currentPage:response.currentPage,
            pageSize:response.pageSize,
            totalCount:response.totalCount,
            totalPage:response.totalPage
          };
          console.log(this.members);
          
        
          
        })
      });
    }

    onClear() {
      this.params=this.memberService.resetUserParams();
    }
    onSubmit(form: NgForm) {
    this.loadMember();
    }
}
