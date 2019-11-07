import ASocketController from './ASocketController';
import ServerSocket from "./sockets/ServerSocket";
import {OnSuccess} from "../decorators/SocketDecorators";
import * as si from "systeminformation";
import {boundClass} from "autobind-decorator";

@boundClass
export default class ServerController extends ASocketController {
  SocketClass;
  namespace;

  constructor(ws) {
    super(ws);
  }

  initProperties() {
    this.SocketClass = ServerSocket;
    this.namespace = 'users';
  }
}
