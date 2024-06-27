import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { IUser } from './_models/account.models';
import { PresenceService } from './_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private presenceService:PresenceService
  ) {}
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    if(localStorage.getItem('User')){
    const user: IUser = JSON.parse(localStorage.getItem('User')!);
    if(user){
      this.accountService.setCurrentUser(user);
      this.presenceService.createHubConnection(user);
    }else{
      this.accountService.setCurrentUser(null)
    }
  
  }
}
}
