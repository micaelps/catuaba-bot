import type { CustomClient } from '../types/index';
import type { Message } from 'discord.js';

const execute = (bot: CustomClient, msg: Message, args: Array<string>) => {
  const queue = bot.queues?.get(msg.guild?.id || '');
  if (!queue) {
    return msg.reply("tem que ter musica pra parar, poha!");
  }
  queue.songs = [];
  bot.queues?.set(msg.guild?.id || '', queue);
  queue.dispatcher.end();
};

module.exports = {
  name: "stop",
  help: "Para a reprodução de músicas no servidor",
  execute,
};
