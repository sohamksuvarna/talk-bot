module.exports.run = (client, message, args) => {
	let check = client.db.get(`check_${message.guild.id}`);
	if (check) {
		client.db.delete(`check_${message.guild.id}`) && message.channel.send("Chat was disabled")
		client.db.delete(`languagecode_${message.guild.id}`)
		client.db.delete(`language_${message.guild.id}`)
	
	}
	else {
		client.db.set(`check_${message.guild.id}`, true) 
		message.channel.send("Chat was enabled")
		if (args[0]) {
			let a = require('../languages.json')[args[0].toLowerCase()] || "en-US"
			if (a) { 
				client.db.set(`languagecode_${message.guild.id}`, a)
				client.db.set(`language_${message.guild.id}`, args[0].toLowerCase())
			}
		} 
	}
}

module.exports.config = {
	name: "chat",
	aliases: ["talk"]
}