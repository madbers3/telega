import {Socket, Server, Namespace} from 'socket.io';
import ASocket from './sockets/ASocket';
import {boundClass} from 'autobind-decorator';

@boundClass
export default abstract class ASocketController {
  public abstract SocketClass;
  public abstract namespace: string;

  sockets: Namespace;

  socketsControllers: ASocket[] = [];

  constructor(ws: Server) {
    this.initProperties();
    this.initSockets(ws);
  }

  abstract initProperties();

  initSockets(ws: Server) {
    this.sockets = ws.of(this.namespace);
    this.sockets.on('connection', this.onConnection);
  }

  protected onConnection(socket: Socket) {
    const SocketClass: any = this.SocketClass;
    this.socketsControllers.push(new SocketClass(socket));
  }
}
