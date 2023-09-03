import { Telegraf } from "telegraf";
import { message  } from "telegraf/filters"
import config from "config";

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
    /** Сколько по времени бот может ожидать ответа от сервера */
    handlerTimeout: Infinity 
})

bot.command('start', context => {
    context.reply('Добро пожаловать в бота. Отправьте текстовое сообщение с тезисами про историю.')
})

bot.on(message('text'), context => {
    context.reply('test')
})

bot.launch()