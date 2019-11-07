import {boundClass} from "autobind-decorator";
import Telegraf from 'telegraf';
import IContextMessageUpdateMK2 from "../../interfaces/IContextMessageUpdateMK2";
import BaseMessagesHelper from "../../messages/BaseMessagesHelper";
import * as uuid from 'uuid';

@boundClass
export default class TranslateModule {
    private bot: Telegraf<IContextMessageUpdateMK2>;

    private passwordsMessages = [
        'Сделай пароль',
        'Создай пароль',
        'Сгенерируй пароль',
        'Создай секретный ключ',
        'Новый пароль',
        'Новый ключ',
        'Пароль',
        'Придумай пароль',
        'Алиса, придумай пароль'
    ];

    constructor(bot: Telegraf<IContextMessageUpdateMK2>) {
        this.bot = bot;

        this.bot.hears(this.passwordsMessages, this.newPasswordMiddleware);
    }

    private async newPasswordMiddleware (ctx: IContextMessageUpdateMK2) {
        await ctx.reply(BaseMessagesHelper.getYesMessage());
        await ctx.reply(uuid.v4());
    }
}
