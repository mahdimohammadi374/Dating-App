import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessage, MessageParams } from '../_models/message';
import { PaginatedResult } from '../_models/pagination';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, map, take } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { IUser } from '../_models/account.models';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private baseUrl: string = environment.baseUrl;
  private messageParams: MessageParams = new MessageParams();
  private hubUrl: string = environment.hubUrl;
  private hubConnection: HubConnection;
  private messagesThread = new BehaviorSubject<IMessage[]>([]);
  public messageThread$ = this.messagesThread.asObservable();

  constructor(private http: HttpClient , private toast:ToastrService , private router:Router) {}

  createHubConnection(user: IUser, otherUser: string) {
    console.log(user.token);

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}/messages?user=${otherUser}`, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((err) => {
      console.log(err);
    });

    this.hubConnection.on('RecieveMessageThread', (messages: IMessage[]) => {
      this.messagesThread.next(messages);
    });

    this.hubConnection.on("NewMessage" , (messages:IMessage)=>{
      this.messagesThread.next([...this.messagesThread.getValue() , messages])
    })

    this.hubConnection.on("newUnreadMessage" , (obj:{username:string , content:string})=>{
      
      this.toast.info(`${obj.username} sent you a message `)
      .onTap.pipe(take(1)).subscribe({
        next:(response)=>{
          this.router.navigateByUrl(`/members/${obj.username}?tab=2`)
        }
      })
    } )
  }

  stopHubConnection() {
    this.hubConnection.stop().catch((err) => {
      console.log(err);
    });
  }

  async sendMessageHub(recipentUserName: string, content: string) {
    try {
      return await this.hubConnection.invoke('sendMessage', {
        RecipientUserName: recipentUserName,
        Content: content,
      });
    } catch (err) {
      console.log(err);
    }
  }

  getMessages(messageParams: MessageParams) {
    let params = this.setParams(messageParams);
    return this.http.get<PaginatedResult<IMessage[]>>(
      `${this.baseUrl}/Message/get-messages`,
      {
        params,
      }
    );
  }

  getMessagesThread(userName: string) {
    return this.http.get<IMessage[]>(
      `${this.baseUrl}/Message/get-messages-thread/${userName}`
    );
  }

  sendMessage(recipentUserName: string, content: string) {
    return this.http.post<IMessage>(`${this.baseUrl}/Message/create-message`, {
      RecipientUserName: recipentUserName,
      Content: content,
    });
  }

  private setParams(messageParams: MessageParams) {
    let params = new HttpParams();
    if (messageParams.pageNumber && messageParams.pageSize) {
      params = params.append('PageNumber', messageParams.pageNumber.toString());
      params = params.append('PageSize', messageParams.pageSize.toString());
      params = params.append('Container', messageParams.container.toString());
    }
    return params;
  }

  setMessageParams(up: MessageParams) {
    this.messageParams = up;
  }
  getMessageParams() {
    return this.messageParams;
  }
  resetMessageParams() {
    this.messageParams = new MessageParams();
    return this.messageParams;
  }
}
