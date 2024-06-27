import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMessage } from 'src/app/_models/message';
import { MessagesService } from 'src/app/_services/messages.service';

@Component({
  selector: 'app-message-member',
  templateUrl: './message-member.component.html',
  styleUrls: ['./message-member.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MessageMemberComponent {

   @Input() userName:string;
  // @Input()messages:IMessage[]=[]
  content: string;


  constructor(public messageService:MessagesService){}


  ngOnInit(): void {
   
  }

  onSubmit() {
    this.messageService.sendMessageHub(this.userName , this.content).then(res=>{
      this.content='';
    })
    }
}
