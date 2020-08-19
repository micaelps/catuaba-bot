import type { CustomClient } from '../types/index';
import type { Message } from 'discord.js';
const execute = (bot: CustomClient, msg: Message, args: Array<string>) => {
  const queue = bot.queues?.get(msg.guild?.id || '');
  if (!queue) {
    return msg.reply("pausa alguma musica antes, carai!");
  }
  queue.dispatcher.resume();
};

module.exports = {
  name: "resume",
  help: "Continua a reprodução de música atual",
  execute,
};
