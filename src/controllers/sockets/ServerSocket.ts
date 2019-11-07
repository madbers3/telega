import {Socket} from 'socket.io';
import {boundClass} from 'autobind-decorator';
import {OnSuccess} from '../../decorators/SocketDecorators';
import ASocket from './ASocket';
import * as si from 'systeminformation';

@boundClass
export default class ChatSocket extends ASocket {
  constructor(socket: Socket) {
    super(socket);

    this.socket.on('restart server', this.restartServer);
  }

  @OnSuccess('restart server', 'error restart server', true)
  async restartServer() {
    process.on("exit", function () {
      require("child_process").spawn(process.argv.shift(), process.argv, {
        cwd: process.cwd(),
        detached: true,
        stdio: "inherit"
      });
    });

    process.exit();
  }
}
