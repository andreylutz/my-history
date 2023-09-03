import OpenAI from 'openai';
import config from 'config';

const CHAT_GPT_MODEL = 'gpt-3.5-turbo';

const ROLES = {
  /** Отвечает за ответы чата */
  ASSISTANT: 'assistant',
  /** Системный ассистент для chatGPT */
  SYSTEM: 'system',
  /** Отвечат за отправку данных клиентом */
  USER: 'user',
};

const openAI = new OpenAI({
  apiKey: config.get('OPEN_AI_KEY'),
});

const getMessage = (mes) => `
    Напиши на основе этих тезисов последовательную эмоциональную историю: ${mes}

    Эти тезисы с описанием ключевых моментов дня.
    Необходимо в итоге получить такую историю, что б я запомнил этот день и
    смог в последствии рассказать её друзьям. Много текста не нужно, главное,
    чтобы были эмоции, правильная последовательность с учётом контекста. 
`;

export async function chatGPT(message = '') {
  const messages = [
    {
      role: ROLES.SYSTEM,
      content:
        'Ты опытный копирайтер, который пишет краткие эмоциональные статьи для социальных сетей.',
    },
    {
      role: ROLES.USER,
      content: getMessage(message),
    },
  ];

  try {
    const completion = await openAI.chat.completions.create({
      messages,
      model: CHAT_GPT_MODEL,
    });

    return completion.choices[0].message;
  } catch (error) {
    console.error('Error while chat completion', error.message);
  }
}
