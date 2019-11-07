import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import environment from "../../environments/environment";
import {WsEvent} from "ws-client-events-decorators";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  @WsEvent({name: 'send message', 'success': 'send message success'})
  sendMessage: (text: string) => Promise<void>;

  constructor() {
    this.socket = io(environment.serverUrl ? environment.serverUrl + '/chat' : '/chat');
  }
}
