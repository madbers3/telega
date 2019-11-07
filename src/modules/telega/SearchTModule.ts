import Telegraf from 'telegraf';
import IContextMessageUpdateMK2 from "../../interfaces/IContextMessageUpdateMK2";
import {boundClass} from "autobind-decorator";
import BaseMessagesHelper from "../../messages/BaseMessagesHelper";
import * as googleIt from 'google-it';

@boundClass
export default class SearchTModule {
    private bot: Telegraf<IContextMessageUpdateMK2>;

    private searchMessages = [
        /Найди: (.+)/,
        /Найди (.+)/,
        /Алиса, найди (.+)/,
        /Алиса, найди: (.+)/,
        /Алиса, поиск (.+)/,
        /Алиса, поиск: (.+)/,
        /Поиск (.+)/,
        /Окей, гугл (.+)/,
    ];

    constructor(bot: Telegraf<IContextMessageUpdateMK2>) {
        this.bot = bot;

        this.bot.hears(this.searchMessages, this.searchMiddleware);
    }

    private async searchMiddleware(ctx: IContextMessageUpdateMK2) {
        await ctx.reply(BaseMessagesHelper.getYesMessage());

        const text = ctx.match[1];

        if (!text) {
            ctx.reply('Вы ввели пустой текст..');
            return;
        }

        const searched = await this.search((text));

        for (const sear of searched) {
            ctx.replyWithHTML('<a href="' + sear.link + '">' + sear.title + '</a>');
        }

        if (!searched) {
            ctx.reply('Не могу найти...');
            return;
        }
    }

    private async search(text: string): Promise<{ title: string; link: string; }[]> {
        return await googleIt({query: text});
    }
}
