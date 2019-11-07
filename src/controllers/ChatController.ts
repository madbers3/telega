import ASocketController from './ASocketController';
import ChatSocket from "./sockets/ChatSocket";

export default class ChatController extends ASocketController {
  SocketClass;
  namespace;

  initProperties() {
    this.SocketClass = ChatSocket;
    this.namespace = 'chat';
  }
}
