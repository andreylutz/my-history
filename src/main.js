import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import config from 'config';
import { chatGPT } from './chatgpt.js';

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
  /** Сколько по времени бот может ожидать ответа от сервера */
  handlerTimeout: Infinity,
});

bot.command('start', (context) => {
  context.reply(
    'Добро пожаловать в бота. Отправьте текстовое сообщение с тезисами про историю.',
  );
});

bot.on(message('text'), async (context) => {
  await chatGPT(context.message.text);
  context.reply('test');
});

bot.launch();
