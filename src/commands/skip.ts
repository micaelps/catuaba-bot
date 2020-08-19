import type { CustomClient } from '../types/index';
import type { Message } from 'discord.js';

const playSong = require("./play").playSong;

const execute = (bot: CustomClient, msg: Message, args: Array<string>) => {
  const queue = bot.queues?.get(msg.guild?.id || '');
  if (!queue) {
    return msg.reply("vou pular oq? mizera!!");
  }
  queue.songs.shift();
  bot.queues?.set(msg.guild?.id || '', queue);
  playSong(bot, msg, queue.songs[0]);
};

module.exports = {
  name: "skip",
  help: "Pula para a próxima música",
  execute,
};
