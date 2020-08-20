import type { CustomClient } from '../types/index';
import type { Message } from 'discord.js';


const execute = (bot: CustomClient, msg: Message, args: Array<string>) => {
  const queue = bot.queues?.get(msg.guild?.id || '');
  if (!queue) {
    return msg.reply("como vai pausar sem musica? burro do caralho");
  }
  queue.dispatcher.pause();
};

module.exports = {
  name: "pause",
  help: "Pausa a reprodução de música atual",
  execute,
};
