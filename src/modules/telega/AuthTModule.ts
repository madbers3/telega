import {boundClass} from "autobind-decorator";
import Telegraf, {Markup} from 'telegraf';
import IContextMessageUpdateMK2 from "../../interfaces/IContextMessageUpdateMK2";
import * as WizardScene from 'telegraf/scenes/wizard';
import * as Stage from 'telegraf/stage';
import * as validator from 'validator';
// https://www.npmjs.com/package/randomatic
import * as randomize from 'randomatic';
import mail from "../../models/business/mail";
import * as Mail from "nodemailer/lib/mailer";
import User from "../../models/mongo/User";

@boundClass
export default class AuthTModule {
  private bot: Telegraf<IContextMessageUpdateMK2>;
  private stages = {reg: 'registration', recover: 'recover', login: 'login'};

  leaveMessages = [
    'Не хочу',
    'Да ну тебя',
    ':((',
    'Выход',
    'Выйти',
    'Хватит',
    'Не надо',
    'Заверши'
  ];

  private rules = {
    password: {
      minLength: 6,
      maxLength: 255
    }
  };

  constructor(bot: Telegraf<IContextMessageUpdateMK2>) {
    this.bot = bot;

    const stage = new Stage([this.getRegistrationScene(), this.getLoginScene(), this.getRecoverPasswordScene()]);

    bot.use(stage.middleware());

    bot.hears('Регистрация', AuthTModule.notAuthorized, async (ctx) => {
      await ctx.reply("Выберите действие!", Markup.inlineKeyboard([
        Markup.callbackButton("Создать аккаунт!", this.stages.reg),
        Markup.callbackButton("У меня уже есть аккаунт!", this.stages.login),
        Markup.callbackButton("Я забыл свой пароль..", this.stages.recover)
      ], {columns: 2}).extra());
    });

    bot.hears(['Вход', 'Войти'], AuthTModule.notAuthorized, async (ctx) => {
      await ctx.reply("Выберите действие!", Markup.inlineKeyboard([
        Markup.callbackButton("Войти!", this.stages.login),
        Markup.callbackButton("Создать аккаунт!", this.stages.reg),
        Markup.callbackButton("Я забыл свой пароль..", this.stages.recover)
      ], {columns: 2}).extra());
    });

    bot.hears(['Выйти из акаунта', 'Логаут'], AuthTModule.authorized, (ctx) => {
      ctx.session.user = undefined;
      ctx.reply('Выхожу..');
    });

    bot.action(this.stages.reg, AuthTModule.notAuthorized, async (ctx) => {
      ctx.scene.enter(this.stages.reg);
    });

    bot.action(this.stages.login, AuthTModule.notAuthorized, async (ctx) => {
      ctx.scene.enter(this.stages.login);
    });

    bot.action(this.stages.recover, AuthTModule.notAuthorized, async (ctx) => {
      ctx.scene.enter(this.stages.recover);
    });
  }

  private getRegistrationScene(): WizardScene {
    return new WizardScene(this.stages.reg,
      async (ctx) => {
        if (await this.stageLeave(ctx)) {
          return ctx.scene.leave(this.stages.reg);
        }
        ctx.reply('Пожалуйста, введите Email');
        return ctx.wizard.next();
      },
      async (ctx) => {
        if (await this.stageLeave(ctx)) {
          return ctx.scene.leave(this.stages.reg);
        }

        ctx.message.text = ctx.message.text.trim();

        if (typeof ctx.message.text !== 'string' || !validator.isEmail(ctx.message.text)) {
          await ctx.reply('Это не Email :((');
          ctx.wizard.back();
          return ctx.wizard.next();
        }

        if (await User.findOne({email: ctx.message.text})) {
          await ctx.reply('Такой email уже занят...');
          ctx.wizard.back();
          return ctx.wizard.next();
        }

        ctx.wizard.state.email = ctx.message.text;

        await ctx.reply('Теперь введите пароль');
        await ctx.reply(`Пароль должен содержать от ${this.rules.password.minLength} до ${this.rules.password.maxLength} символов: UTF-8`);
        await ctx.reply('Также через некоторое время введенные вами данные будут удалены, пожалуйста, запомните.');
        return ctx.wizard.next(); // Переходим к следующему обработчику.
      },
      async (ctx) => {
        if (await this.stageLeave(ctx)) {
          return ctx.scene.leave(this.stages.reg);
        }

        ctx.message.text = ctx.message.text.trim();

        if (typeof ctx.message.text !== 'string' || !validator.isLength(ctx.message.text, this.rules.password.minLength, this.rules.password.maxLength)) {
          await ctx.reply('Это не похоже на пароль 🧐');
          ctx.wizard.back();
          return ctx.wizard.next();
        }

        ctx.wizard.state.password = ctx.message.text;

        await ctx.reply('Пожалуйста, повторите пароль');

        return ctx.wizard.next(); // Переходим к следующему обработчику.
      },
      async (ctx) => {
        if (await this.stageLeave(ctx)) {
          return ctx.scene.leave(this.stages.reg);
        }

        if (ctx.wizard.state.password !== ctx.message.text) {
          if (ctx.message.text.toLowerCase() === "назад") {
            ctx.wizard.back();
            ctx.wizard.back();
            await ctx.reply('Хорошо, попробуй ввести новый пароль');
            return ctx.wizard.next();
          }

          if (!ctx.wizard.state.memory1) {
            await ctx.reply('🤷🏻‍♀️Пароль не совпадает, попробуй еще раз, если хочешь вернутся "назад", то так и скажи 🤔');
          } else {
            await ctx.reply('Пароль не совпадает 🤔');
          }

          ctx.wizard.state.memory1 = true;

          ctx.wizard.back();
          return ctx.wizard.next();
        }

        await ctx.reply('Хорошо, пароль совпадает');

        await ctx.reply('Давай подтвердим твой EMAIL, я отправила на него сообщение с секретным кодом 📨');
        await ctx.reply('Я отменю регистрацию если ты введешь пароль несколько раз неправильно');

        const secretCode: string = randomize('AAAAA');

        const message: Mail.Options = {
          from: 'Alice 👻',
          to: ctx.wizard.state.email,
          subject: 'Alice 👻',
          html:
            `
          <p>Привет, можете ли Вы подтвердить Email аддресс?</p>
          CODE: ` + secretCode
        };

        ctx.wizard.state.emailCode = secretCode;
        ctx.wizard.state.attempts = 0;

        await mail.sendEmail(message);

        return ctx.wizard.next();
      },
      async (ctx: IContextMessageUpdateMK2) => {
        if (await this.stageLeave(ctx)) {
          return ctx.scene.leave(this.stages.reg);
        }

        ctx.wizard.state.attempts++;

        if (ctx.wizard.state.emailCode !== ctx.message.text) {
          await ctx.reply('Хм, не похоже на секретный код');

          if (ctx.wizard.state.attempts >= 3) {
            await ctx.reply('Слишком много попыток, я отменю регистрацию, эх ты');
            return ctx.scene.leave(this.stages.reg);
          }
          await ctx.reply('Осталось ' + (3 - ctx.wizard.state.attempts) + ' попыток');
          ctx.wizard.back();
          return ctx.wizard.next();
        }

        await ctx.reply('Да, получилось');

        const user = new User();

        user.firstName = ctx.message.chat.first_name;
        user.chatId = ctx.message.chat.id;
        user.email = ctx.wizard.state.email;
        user.hash = user.createHash(ctx.wizard.state.password);

        await user.save();

        ctx.session.user = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
          chatId: user.chatId
        };

        await ctx.reply('Похоже всё, добро пожаловать 😁');

        return ctx.wizard.next();
      },

      async (ctx) => {
        if (await this.stageLeave(ctx)) {
          return ctx.scene.leave(this.stages.reg);
        }

        return ctx.scene.leave(this.stages.reg);
      }
    );
  }

  private getLoginScene(): WizardScene {
    return new WizardScene(this.stages.login,
      async (ctx) => {
        if (await this.stageLeave(ctx)) {
          return ctx.scene.leave(this.stages.login);
        }
        ctx.reply('Пожалуйста, введите Email');
        return ctx.wizard.next();
      },
      async (ctx) => {
        if (await this.stageLeave(ctx)) {
          return ctx.scene.leave(this.stages.login);
        }

        ctx.message.text = ctx.message.text.trim();

        if (typeof ctx.message.text !== 'string' || !validator.isEmail(ctx.message.text)) {
          await ctx.reply('Это не Email, эх');
          ctx.wizard.back();
          return ctx.wizard.next();
        }

        await ctx.reply('Теперь введите пароль');

        ctx.wizard.state.email = ctx.message.text;

        return ctx.wizard.next(); // Переходим к следующему обработчику.
      },
      async (ctx) => {
        if (await this.stageLeave(ctx)) {
          return ctx.scene.leave(this.stages.login);
        }

        ctx.message.text = ctx.message.text.trim();

        if (typeof ctx.message.text !== 'string' || !validator.isLength(ctx.message.text, this.rules.password.minLength, this.rules.password.maxLength)) {
          if (ctx.message.text.toLowerCase() === "назад") {
            ctx.wizard.back();
            ctx.wizard.back();
            await ctx.reply('Хорошо, вводите Email');
            return ctx.wizard.next();
          }

          await ctx.reply('Это не похоже на пароль 🧐');
          await ctx.reply(`Пароль должен содержать от ${this.rules.password.minLength} до ${this.rules.password.maxLength} символов: UTF-8`);
          ctx.wizard.back();
          return ctx.wizard.next();
        }

        const user = await User.findOne({email: ctx.wizard.state.email});

        if (!user || !user.verifyPassword(ctx.message.text, user.hash)) {
          await ctx.reply('Не правильный логин или пароль, попробуйте еще раз');
          ctx.wizard.back();
          return ctx.wizard.next();
        }

        await ctx.reply('Добро пожаловать, хозяин ❤️');

        ctx.session.user = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
          chatId: user.chatId
        };

        return ctx.scene.leave(this.stages.login);
      }
    );
  }

  private getRecoverPasswordScene(): WizardScene {
    return new WizardScene(this.stages.recover,
      async (ctx) => {
        await ctx.reply('Оу.. какая неудача');
        await ctx.reply('Пожалуйста, введите Email адресс');
        return ctx.wizard.next();
      },
      async (ctx) => {
        await ctx.reply('Вы потеряли пароль или Google Auth?');
        return ctx.wizard.next(); // Переходим к следующему обработчику.
      },
      async (ctx) => {
        await ctx.reply('Пожалуйста, введите GOOGLE AUTH');
        return ctx.wizard.next(); // Переходим к следующему обработчику.
      },
    );
  }

  private async stageLeave(ctx): Promise<boolean> {
    if (!ctx.message) {
      return false;
    }
    const result = this.isLeaveMessage(ctx.message.text);
    if (result) {
      await ctx.reply('Хорошо... Не надо так не надо')
    }
    return result;
  }

  private isLeaveMessage(message: string): boolean {
    for (const leaveMessage of this.leaveMessages) {
      if (message.toLowerCase() === leaveMessage.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  private static async notAuthorized(ctx, next) {
    if (ctx.session.user) {
      await ctx.reply('Хозяин, вы уже авторизованы');
      return;
    }

    next(ctx);
  }

  private static async authorized(ctx, next) {
    if (!ctx.session.user) {
      await ctx.reply('Вы не авторизованы для этого');
      return;
    }

    next(ctx);
  }
}
