import Telegraf from 'telegraf';
import IContextMessageUpdateMK2 from "../interfaces/IContextMessageUpdateMK2";
import secrets from "../config/secrets";
import {TelegrafMongoSession } from "telegraf-session-mongodb";

export const bot = new Telegraf<IContextMessageUpdateMK2>(secrets.utils.telega.token);
TelegrafMongoSession.setup(bot, secrets.utils.mongo.connectionString);

bot.startPolling();
