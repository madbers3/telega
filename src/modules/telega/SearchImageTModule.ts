import {boundClass} from "autobind-decorator";
import Telegraf from 'telegraf';
import IContextMessageUpdateMK2 from "../../interfaces/IContextMessageUpdateMK2";

@boundClass
export default class SearchImageTModule {
    private bot: Telegraf<IContextMessageUpdateMK2>;

    constructor(bot: Telegraf<IContextMessageUpdateMK2>) {
        this.bot = bot;

        bot.hears('Фото', async (ctx) => {
            await ctx.reply('Фото?');
        });
    }
}
