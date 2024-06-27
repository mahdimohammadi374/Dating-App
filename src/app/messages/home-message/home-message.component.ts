import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { finalize } from 'rxjs';
import { IMessage, MessageParams } from 'src/app/_models/message';
import { PaginatedResult } from 'src/app/_models/pagination';
import { MessagesService } from 'src/app/_services/messages.service';

@Component({
  selector: 'app-home-message',
  templateUrl: './home-message.component.html',
  styleUrls: ['./home-message.component.css']
})
export class HomeMessageComponent implements OnInit{
  messageParams:MessageParams;
  messages:IMessage[]=[]
  result:PaginatedResult<IMessage[]>;
  loading = false;


  constructor(private messageService:MessagesService){
    this.messageParams=messageService.getMessageParams();
  }
ngOnInit(): void {
  this.loadMessages();
}





  private loadMessages() {
    this.loading=true;
    this.messageService.getMessages(this.messageParams)
    .pipe(finalize(() => (this.loading = false)))
    .subscribe({
      next: (response) => {
        this.messages = response.items;
        this.result = response;
      }
    });
  }

changeContainer(container: string) {
  this.messageParams.container=container;
  this.messageService.setMessageParams(this.messageParams);
  this.loadMessages();
}
pageChanged(event: PageChangedEvent) {
  this.messageParams.pageNumber=event.page;
  this.messageService.setMessageParams  (this.messageParams);
  this.loadMessages()
  }

}
