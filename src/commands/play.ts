import type { CustomClient } from '../types/index';
import type { Message } from 'discord.js';
import ytdl from 'ytdl-core-discord';
const search: any = require('yt-search')

const execute = (bot: CustomClient, msg: Message, args: Array<string>) => {
  const s = args.join(" ");
  let searches = bot.searches?.get(msg.guild?.id || '');
  try {
    if (parseInt(s) && searches && searches[msg.author.id] && searches[msg.author.id].options) {
      try {
        const song = searches[msg.author.id].options[parseInt(s)]
        const queue = bot.queues?.get(msg.guild?.id || '');
        if (queue) {
          queue.songs.push(song);
          bot.queues?.set(msg.guild?.id || '', queue);
        } else playSong(bot, msg, song);
        searches[msg.author.id] = undefined
        bot.searches?.set(msg.guild?.id || '', searches);
      } catch (e) {
        console.log(e);
      }
    } else {
      search(s, (err: any, result: any) => {
        if (err) {
          throw err;
        } else if (result && result.videos.length > 0) {
          const resultSongs = result.videos.slice(0, 5);
          const options: any = {}
          resultSongs.map((song: any, i: number) => options[i + 1] = song)
          if (!searches) {
            searches = {}
          }
          searches[msg.author.id] = {}
          searches[msg.author.id].options = options;
          bot.searches?.set(msg.guild?.id || '', searches);
          msg.reply(`Resultados:\n${Object.values(options).map((option: any, i: number) => `${i + 1}- ${option.title} (${option.timestamp})`).join('\n')}`)
        } else {
          return msg.reply("que poha é isso? encontrei nada!");
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
};

const playSong = async (bot: CustomClient, msg: Message, song: any) => {
  let queue = bot.queues?.get(msg.member?.guild.id || '');
  if (!song) {
    if (queue) {
      queue.connection.disconnect();
      return bot.queues?.delete(msg.member?.guild.id || '');
    }
  }
  if (!msg.member?.voice.channel) {
    return msg.reply(
      "entra num canal, otario."
    );
  }
  if (!queue) {
    const conn = await msg.member?.voice.channel.join();
    queue = {
      volume: 10,
      connection: conn,
      dispatcher: null,
      songs: [song],
    };
  }
  queue.dispatcher = await queue.connection.play(
    await ytdl(song.url, { highWaterMark: 1 << 25, filter: "audioonly" }),
    {
      type: "opus",
    }
  );
  queue.dispatcher.on("finish", () => {
    queue?.songs.shift();
    playSong(bot, msg, queue?.songs[0]);
  });
  bot.queues?.set(msg.member?.guild.id || '', queue);
};

module.exports = {
  name: "play",
  help: "Reproduz a música desejada no canal atual do usuário",
  execute,
  playSong,
};
