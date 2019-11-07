import {Socket} from 'socket.io';

export default abstract class ASocket {
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }
}
