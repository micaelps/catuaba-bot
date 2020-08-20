import "core-js/stable";
import "regenerator-runtime/runtime";
import dotenv from 'dotenv';
import type { CustomClient } from './types/index';
import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const bot: CustomClient = new Discord.Client();
bot.commands = new Discord.Collection();
bot.queues = new Map();
bot.searches = new Map();

const commandFiles = fs
  .readdirSync(path.join(__dirname, "/commands"))
  .filter((filename) => filename.endsWith(".ts"));

for (var filename of commandFiles) {
  const command = require(`./commands/${filename}`);
  bot.commands.set(command.name, command);
}

bot.login(process.env.TOKEN);

bot.on("ready", function () {
  console.log(`ree`);
});

bot.on("message", (msg) => {

  if (msg.content.startsWith(process.env.PREFIX || '--')) {

    const args = msg.content.slice(process.env.PREFIX?.length || 2).split(" ");
    const command = args.shift();

    try {
      bot.commands?.get(command || `help`).execute(bot, msg, args);
    } catch (e) {
      console.error(e);
      return msg.reply("de onde tu tirou isso? comando inexistente mizera!");
    }






  }
});
