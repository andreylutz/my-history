import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import config from 'config';
import { chatGPT } from './chatgpt.js';
import { create } from './notion.js';
import { Loader } from './loader.js ';

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
  try {
    const text = context.message.text;
    if (!text.trim()) context.reply('Текст не может быть пустым');

    const loader = new Loader(context);

    loader.show();

    const responseGPT = await chatGPT(text);
    if (!responseGPT) return context.reply('Ошибка с API', responseGPT);

    const notionResponse = await create(text, responseGPT.content);

    loader.hide();

    context.reply(responseGPT.content);
    context.reply(`Ваша запись в note: ${notionResponse.url}`);
  } catch (error) {
    console.log('Error while processing text:', error.message);
  }
});

bot.launch();
