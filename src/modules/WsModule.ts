import ChatController from "../controllers/ChatController";
import * as express from 'express';
import * as io from 'socket.io';
import * as path from "path";
import ServerController from "../controllers/ServerController";

export default class WsModule {
  constructor() {
    const app = express();
    app.use(express.static(path.join(__dirname, '../../public/cp')));

    const server = app.listen(4210, 'localhost');

    const ws = io(server);

    const chatController = new ChatController(ws);
    const serverController = new ServerController(ws);

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../public/cp/index.html'));
    });
  }
}
