import { Client } from '@notionhq/client';
import config from 'config';

const notion = new Client({
  auth: config.get('NOTION_KEY'),
});

export async function create(short, text) {
  const response = await notion.pages.create({
    parent: { database_id: config.get('NOTION_DB_ID') },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: short,
            },
          },
        ],
      },
      Date: {
        date: {
          start: new Date().toISOString(),
        },
      },
    },
  });

  return response;
}
