import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from 'src/app/_models/message';
import { MessagesService } from 'src/app/_services/messages.service';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css']
})
export class MemberMessageComponent implements OnInit{
  @Input() userName:string;
  messages:IMessage[]=[]


  constructor(private messageService:MessagesService){}


  ngOnInit(): void {
    this.messageService.getMessagesThread(this.userName).subscribe({
      next:(response)=>{
        this.messages=response;
      }
    })
  }

}
