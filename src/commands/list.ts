
import type { CustomClient } from '../types/index';
import type { Message } from 'discord.js';

const execute = (bot: CustomClient, msg: Message, args: Array<string>) => {
    try {
        const queue = bot.queues?.get(msg.guild?.id || '')
        if (!queue)
            return msg.reply('Tem nada não, otário')
        const string = `Lista de músicas:\n${queue.songs.map((song, i) => `${i + 1} - ${song.title} - (${song.timestamp})`).join('\n')}`
        msg.reply(string)
    } catch (e) {
        console.log(e)
        msg.reply('erro');
    }
};

module.exports = {
    name: "list",
    help: "Musicas na fila",
    execute,
};
