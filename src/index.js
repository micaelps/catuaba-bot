const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.queues = new Map();
bot.searches = new Map();

const commandFiles = fs
  .readdirSync(path.join(__dirname, "/commands"))
  .filter((filename) => filename.endsWith(".js"));

for (var filename of commandFiles) {
  const command = require(`./commands/${filename}`);
  bot.commands.set(command.name, command);
}

bot.login(process.env.TOKEN);

bot.on("ready", function () {
  console.log(`ree`);
});

bot.on("message", (msg) => {

  if (msg.content.startsWith(process.env.PREFIX)){

    const args = msg.content.slice(process.env.PREFIX.length).split(" ");
    const command = args.shift();
  
    try {
      bot.commands.get(command).execute(bot, msg, args);
    } catch (e) {
      console.error(e);
      return msg.reply("de onde tu tirou isso? comando inexistente mizera!");
    }






  }
});
