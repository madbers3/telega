import Telegraf from 'telegraf';
import IContextMessageUpdateMK2 from "../../interfaces/IContextMessageUpdateMK2";
import BaseMessagesHelper from "../../messages/BaseMessagesHelper";
import YandexTranslate from 'yet-another-yandex-translate';
import secrets from "../../config/secrets";
import {boundClass} from 'autobind-decorator';

@boundClass
export default class TranslateModule {
    private bot: Telegraf<IContextMessageUpdateMK2>;
    private translateDefaultTargetFrom = 'ru';
    private translateDefaultTargetTo = 'en';
    private yandexTranslate = new YandexTranslate(secrets.modules.translate.yandexTranslateApiKey);

    private translateMessages = [
        /Переведи: (.+)/,
        /Перевод: (.+)/,
        /Алиса, переведи: (.+)/,
        /Алиса, переведи (.+)/,
        /Алиса, перевод: (.+)/,
        /Алиса, переведи пожалуйста: (.+)/,
        /Переведи (.+)/,
        /Перевод (.+)/,
        /Алиса, переведи: (.+)/,
        /translate (.+)/,
        /translate: (.+)/,
        /Alice, translate: (.+)/,
    ];

    private languages = {
        'русский': 'ru',
        'китайский': 'zh',
        'английский': 'en',
        'русского': 'ru',
        'китайского': 'zh',
        'английского': 'en',
    };

    constructor(bot: Telegraf<IContextMessageUpdateMK2>) {
        this.bot = bot;

        this.bot.hears(this.translateMessages, this.translateMiddleware);
    }

    private async translateMiddleware(ctx: IContextMessageUpdateMK2) {
        await ctx.reply(BaseMessagesHelper.getYesMessage());

        const match1 = ctx.match[1];
        const match2 = ctx.match[2];
        const match3 = ctx.match[3];
        let text;
        let from;
        let to;

        if (match1 && !match2 && !match3) {
            text = ctx.match[1];
        }

        if (match1 && match2 && !match3) { // todo autobinding
        }


        if (!text) {
            ctx.reply('Вы ввели пустой текст..');
            return;
        }

        const translatedText = await this.translate((text));

        if (!translatedText) {
            ctx.reply('Не могу это перевести...');
            return;
        }

        await ctx.reply(translatedText);
    }

    async translate(text: string, from?, to?): Promise<string> {
        const target = await this.getTarget(text);
        if (this.translateDefaultTargetFrom !== target) {
            // @ts-ignore
            return await this.yandexTranslate.translate(text, {
                from: from ? from : target,
                to: to? to : this.translateDefaultTargetFrom,
            })
        } else {
            // @ts-ignore
            return await this.yandexTranslate.translate(text, {
                from: from ? from : this.translateDefaultTargetFrom,
                to: to ? to : this.translateDefaultTargetTo
            })
        }
    }

    async getTarget(text: string): Promise<string> {
        return await this.yandexTranslate.detect(text);
    }
}
