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

    setInterval(this.sendSystemInfo, 1000);
  }

  initProperties() {
    this.SocketClass = ServerSocket;
    this.namespace = 'server';
  }


  async sendSystemInfo() {
    const memory = await si.mem();

    const mem = {
      total: memory.total / 1073741824,
      free: memory.free / 1073741824,
      percent: memory.used / memory.total,
      appUsed: process.memoryUsage().heapUsed / 1073741824,
    };

    this.sockets.emit('system info', {
      cpu: await si.cpu(),
      currentLoad: ((await si.currentLoad()).currentload) / 100,
      mem
    });
  }
}
