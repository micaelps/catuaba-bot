

import type { CustomClient } from '../types/index';
import type { Message } from 'discord.js';

const execute = (bot: CustomClient, msg: Message, args: Array<string>) => {
    let s = "====COMANDOS====\n"
    bot.commands?.forEach(command => {
        if (command.help) {
            s += `--${command.name} = ${command.help}\n`
        }
    });
    return msg.channel.send(s);
}


module.exports = {
    name: "help",
    help: "ajudas",
    execute,
}