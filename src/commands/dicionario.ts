
import request from 'request';
import type { CustomClient } from '../types/index';
import type { Message } from 'discord.js';

interface APIResponseJSON {
  meanings: string,
  etymology: string
}

interface ApiResponse {
  0: APIResponseJSON
}

const execute = (bot: CustomClient, msg: Message, args: Array<string>) => {
  const hostname = 'https://significado.herokuapp.com/';
  console.log(args)
  const path = args.join('-')
  try {
    request(`${hostname}${path}`, (err, res, body) => {
      const objeto: ApiResponse = JSON.parse(body)
      console.log(objeto)
      if (!err && objeto[0]) {
        msg.reply(objeto[0].meanings);
        msg.reply(objeto[0].etymology);
      } else {
        console.log(err)
        msg.reply('Aí dento!')
      }
    });
  } catch (e) {
    console.log(e)
    msg.reply('erro');
  }
};

module.exports = {
  name: "s",
  help: "significado das palavras",
  execute,
};
