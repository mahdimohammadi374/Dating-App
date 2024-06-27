export interface IMessage {
  id: number;
  senderId: number;
  senderUserName: string;
  senderPhotoUrl: string;
  recieverId: number;
  recieverUserName: string;
  recieverPhotoUrl: string;
  content: string;
  dateRead: Date;
  messageSent: Date;
  isRead: boolean;
}
export class MessageParams {
  container: string = 'inbox';
  pageNumber: number = 1;
  pageSize: number = 10;
}
