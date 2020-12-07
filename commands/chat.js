module.exports.run = (client, message, args) => {
	const msg = args.join(" ")
    const googleTTS = require('google-tts-api');
    
    if (!message.member.voice.channel) return message.channel.send("You aren't in a voice channel!")

	let fetch = require('node-fetch')
	fetch(`https://api.shadeoxide.gq/api/chatbot?message=${msg}`)
		.then(res => res.json())
		.then(data => {
			message.member.voice.channel.join().then(conn => {
				googleTTS(data.message, 'en-US', 1)
					.then((url) => {
						conn.play(url)
					})
					.catch((err) => {
						console.error(err.stack);
					});
			})
		})
}

module.exports.config = {
	name: "chat",
	aliases: ["tts"]
}