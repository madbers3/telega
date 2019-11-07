export interface ITelegramUser {
  id: number;
  name: string;

}
export interface IChat {
  user: ITelegramUser,
  messages: {
    text: string;
    timestamp: string;
  }[]
}
