import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { IUser } from '../_models/account.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  private hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private onlineUsers=new BehaviorSubject<string[]>([]);
  public onlineUsers$=this.onlineUsers.asObservable();
  constructor(private toast: ToastrService) {}

  createHubConnection(user: IUser) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '/presence', {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((err) => {
      this.toast.error('hub connection error');
    });

    this.hubConnection.on('UserIsOnline', (userName) => {
      this.toast.success(`${userName} is Online`);
    });
    this.hubConnection.on('UserIsOffline', (userName) => {
      this.toast.error(`${userName} is Offline`);
    });
    this.hubConnection.on('GetOnlineUsers', (users:string[]) => {
      this.onlineUsers.next(users);
    });
  }
  stopHubConnection() {
    this.hubConnection.stop().catch((err)=>{
      this.toast.error("stop hubConnection error")
    })
  }
}
