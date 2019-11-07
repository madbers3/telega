import {boundClass} from "autobind-decorator";
import Telegraf from 'telegraf';
import IContextMessageUpdateMK2 from "../../interfaces/IContextMessageUpdateMK2";
import BaseMessagesHelper from "../../messages/BaseMessagesHelper";
import User from "../../models/mongo/User";

@boundClass
export default class OtherTModule {
  private bot: Telegraf<IContextMessageUpdateMK2>;

  constructor(bot: Telegraf<IContextMessageUpdateMK2>) {
    this.bot = bot;

    bot.start((ctx) => ctx.reply('Привет ❤'));

    bot.help((ctx) => ctx.reply(')))'));

    bot.on('sticker', (ctx) => ctx.reply('❤'));


    bot.hears('Alice', (ctx) => {
      ctx.reply('Привет, я Алиса');
    });

    bot.hears(BaseMessagesHelper.helloMessages, (ctx) => {
      ctx.reply(BaseMessagesHelper.getHelloMessage());
    });

    bot.hears(BaseMessagesHelper.howAreYouMessages, (ctx) => {
      ctx.reply(BaseMessagesHelper.getHowAreYouAnswerMessage());
    });

    bot.hears('Chat ID', (ctx) => {
      ctx.reply(ctx.message.from.id.toString());
    });

    bot.hears('Алиса', async (ctx) => {
      await ctx.reply('Да?');
      // console.log(ctx.session);
    });

    bot.hears('Протестируй уведомление', (ctx) => {
      ctx.reply('Тестируем уведомление....');
      bot.telegram.sendMessage(ctx.message.from.id, 'Агааа, привет (из уведомления)');
    });
  }
}
