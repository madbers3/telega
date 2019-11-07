export default class BaseMessagesHelper {
    public static yesMessages = [
        'Хорошо',
        'Да',
        'Будет исполнено',
        'За кель талас',
        'Угу',
        'угуу',
        '...',
        'С удовольствием',
        'По вашей воле',
        'Так уж и быть',
        'океей',
        'Без проблем',
        'Хи',
        'Хорошо, хозяин',
        'За моего отца',
        'Дааа',
        'Сейчас',
        'Сейчас!'
    ];

    public static helloMessages = [
        'Привет!',
        'Привет',
        'Хай',
        'Доброго времени суток',
        'Хех, привет',
        'Хеелоо',
        'Хело',
        'Салют',
        'Салют!',
        'Какие люди!',
        'Дратуйте',
        'Привет ❤',
        'Горячий привет!',
        'Хи',
        'Здравствуй, хозяин',
        'Моё почтение!',
        'Прив'
    ];

    public static howAreYouMessages = [
        'Как дела?',
        'Как делишки?',
        'Как ты?',
        'Ты как?',
        'Все хорошо?',
        'Как настроение?',
    ];

    public static howAreYouAnswersMessages = [
        'Хорошо!',
        'Хорошо',
        'Все хорошо',
        'Ну такое..',
        'Супер',
        'Супер!',
        'Нууу, нормально',
        'Не плохо',
        'Нормально',
        'Хах, хорошо, что ты спосил.. в общем то хорошо',
        'Не плохо, хозяин! ❤',
    ];

    public static getYesMessage(): string {
        return this.getRandom(this.yesMessages);
    }

    public static getHelloMessage(): string {
        return this.getRandom(this.helloMessages);
    }

    public static getHowAreYouMessage(): string {
        return this.getRandom(this.howAreYouMessages);
    }

    public static getHowAreYouAnswerMessage(): string {
        return this.getRandom(this.howAreYouAnswersMessages);
    }

    private static getRandom(items: any[]) {
        return items[Math.floor(Math.random() * items.length)];
    }
}
