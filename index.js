const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Ready')
})

client.on('message', (message) => {
    if (message.author.bot || !message.guild) return;
    
const fs = require('fs');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    return console.log("Commands not found!");
  }
  
  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`);
    client.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach(alias => {
      client.aliases.set(alias, pull.config.name);
    });
  });
});
})

client.on('message', (message) => {
    client.on('message', (message) => {
        if (message.author.bot || !message.guild) return;
        let prefix = '!';
        if (!message.content.startsWith(prefix)) return;
        let messageArray = message.content.slice(prefix.length).split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);
        let commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if (commandFile) commandFile.run(client, message, args, Discord, fs)
    })
})

client.login("TOKEN")