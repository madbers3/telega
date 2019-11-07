export default {
    language: {
    },
    modules: {
        translate: {
            yandexTranslateApiKey: 'trnsl.1.1.20191016T115818Z.e28ebb759f83db95.09dfe721ced06f6c4ea38e4e70dea4e000e4349f'
        }
    },
    utils: {
        mongo: {
            connectionString: 'mongodb://localhost:27017/alice'
        },
        telega: {
            token: '839447981:AAE9CSou6um51TviyRb5WsQy_sC9V6AFMDs'
        }
    },
    models: {
        mail: {
            emailTransport: {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'antonantion@gmail.com',
                    pass: 'lagtidchxprwrqmj'
                }
            },
        }
    }
}
