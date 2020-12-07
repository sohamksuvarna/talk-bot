const Discord = require('discord.js');
const client = new Discord.Client();
const googleTTS = require('google-tts-api')
const translate = require("@k3rn31p4nic/google-translate-api")
client.db = require('quick.db')

client.on('ready', () => {
    console.log('Ready')
})

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

client.on('message', async (message) => {
        if (message.author.bot || !message.guild) return;
        let prefix = '!';
        if (message.content.startsWith(prefix)) {
        let messageArray = message.content.slice(prefix.length).split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);
        let commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if (commandFile) commandFile.run(client, message, args, Discord, fs)
        } else {
        let check = client.db.get(`check_${message.guild.id}`)
        if (check) {
  let fetch = require('node-fetch')
    fetch(`https://api.shadeoxide.gq/api/chatbot?message=${encodeURIComponent(message.content)}&name=TalkBot&gender=female&user=${message.author.id}&age=69`)
      .then(res => res.json())
      .then(async data => {
        let lang = client.db.get(`language_${message.guild.id}`) || "english"
        let translated = await translate(data.message, { to: lang });
        let langcode = client.db.get(`languagecode_${message.guild.id}`) || "en-US"
        message.member.voice.channel.join().then(conn => {
          console.log(translated.text)
          googleTTS(translated.text, langcode, 1)
            .then((url) => {
              conn.play(url)
            })
            .catch((err) => {
              console.error(err.stack);
            });
        })
      })
}
}
})

client.login("TOKEN")