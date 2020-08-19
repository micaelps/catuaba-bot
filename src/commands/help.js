const { BitField } = require("discord.js")

const execute = (bot, msg, args) =>{
    let s ="====COMANDOS====\n"
    bot.commands.forEach(command => {
        if(command.help){
            s+=`--${command.name} = ${command.help}\n`
        }
    });
    return msg.channel.send(s);
}


module.exports = {
    name:"help",
    help:"ajudas",
    execute,
}