export interface Chat {
  id: number;
  participants: Participant[];
}
export interface Participant {
  id: number;
  name: string;
}
export interface Message {
  id: number;
  text: string;
  senderId: number;
  createdAt: string;
}
