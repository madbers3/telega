import {Socket} from 'socket.io';
import {boundClass} from 'autobind-decorator';
import {OnSuccess} from '../../decorators/SocketDecorators';
import ASocket from './ASocket';
import {IChat, ITelegramUser} from "../../interfaces/ITelegaDatatypes";
import {bot} from "../../utils/telegramBot";

@boundClass
export default class ChatSocket extends ASocket {
  constructor(socket: Socket) {
    super(socket);
    this.socket.on('send message', this.sendMessage);
    this.socket.on('get chat', this.getChat);
    this.socket.on('get chats', this.getChats);
  }

  @OnSuccess('send message success')
  async sendMessage(message: string) {
    await bot.telegram.sendMessage(387105203, message);
  }

  @OnSuccess('get chat success')
  async getChat(message: string): Promise<IChat> {
    return undefined;
  }

  @OnSuccess('get chats success')
  async getChats(message: string): Promise<ITelegramUser> {
    return undefined;
  }
}
