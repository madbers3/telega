import {ContextMessageUpdate} from 'telegraf';
import WizardContext from "telegraf/scenes/wizard/context";

export default interface IContextMessageUpdateMK2 extends ContextMessageUpdate {
    session: any;
    wizard: WizardContext;
    scene: any;
    state: any;
}
