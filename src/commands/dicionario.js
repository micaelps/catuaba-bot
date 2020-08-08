
const request = require('request');

const execute = (bot, msg, args) => {
    const hostname = 'https://significado.herokuapp.com/';
    const path = msg.content.split(" ")[1];
    try {
      request(`${hostname}${path}`, (err, res, body) => {
      objeto = JSON.parse(body)
      msg.reply(objeto[0].meanings);
      msg.reply(objeto[0].etymology);
    });
    } catch (e) {
        console.log(e)
        msg.reply('erro');
    }
  };
  
  module.exports = {
    name: "s",
    help: "significado das palavras",
    execute,
  };
  