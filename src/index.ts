import TranslateModule from "./modules/telega/TranslateModule";
import SearchTModule from "./modules/telega/SearchTModule";
import PasswordsModule from "./modules/telega/PasswordsTModule";
import OtherTModule from "./modules/telega/OtherTModule";
import SearchImageTModule from "./modules/telega/SearchImageTModule";
import ElectronModule from "./modules/ElectronModule";
import WsModule from "./modules/WsModule";
import {bot} from "./utils/telegramBot";
import AuthTModule from "./modules/telega/AuthTModule";
import mongoose from "./utils/mongoose";

(async () => {
    const mongoo = mongoose;

    const otherModule = new OtherTModule(bot);
    const translateModule = new TranslateModule(bot);
    const searchModule = new SearchTModule(bot);
    const passwordsModule = new PasswordsModule(bot);
    const authModule = new AuthTModule(bot);
    const searchImageModule = new SearchImageTModule(bot);

    const wsModule = new WsModule();

    const electronModule = new ElectronModule(bot);

    await bot.launch();

    console.log('Alice is launch');
})();
