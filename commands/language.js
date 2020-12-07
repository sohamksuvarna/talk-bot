module.exports.run = async (client, message, args) => {
    let languages = ["afrikaans", "albanian", "amharic", "arabic", "armenian", "azerbaijani", "bangla", "basque", "belarusian", "bengali", "bosnian", "bulgarian", "burmese", "catalan", "cebuano", "chichewa", "corsican", "croatian", "czech", "danish", "dutch", "english", "esperanto", "estonian", "filipino", "finnish", "french", "frisian", "galician", "georgian", "german", "greek", "gujarati", "haitian creole", "hausa", "hawaiian", "hebrew", "hindi", "hmong", "hungarian", "icelandic", "igbo", "indonesian", "irish", "italian", "japanese", "javanese", "kannada", "kazakh", "khmer", "korean", "kurdish (kurmanji)", "kyrgyz", "lao", "latin", "latvian", "lithuanian", "luxembourgish", "macedonian", "malagasy", "malay", "malayalam", "maltese", "maori", "marathi", "mongolian", "myanmar (burmese)", "nepali", "norwegian", "nyanja", "pashto", "persian", "polish", "portugese", "punjabi", "romanian", "russian", "samoan", "scottish gaelic", "serbian", "sesotho", "shona", "sindhi", "sinhala", "slovak", "slovenian", "somali", "spanish", "sundanese", "swahili", "swedish", "tajik", "tamil", "telugu", "thai", "turkish", "ukrainian", "urdu", "uzbek", "vietnamese", "welsh", "xhosa", "yiddish", "yoruba", "zulu"];
    if (!args[0]) {
        let index = 0;
        let langsList = "```css\n"+(languages.map((l, i) => `#${i+1} - ${l}`).join("\n"))+"```";
        return message.channel.send(langsList);
    }
    if (args[0]) {
        let a = require('../languages.json')[args[0].toLowerCase()] || "en-US"
        if (a) { 
            client.db.set(`languagecode_${message.guild.id}`, a)
            client.db.set(`language_${message.guild.id}`, args[0].toLowerCase())
        const googleTTS = require('google-tts-api')
            const translate = require("@k3rn31p4nic/google-translate-api")
            let translated = await translate(`The language has been changed to ${args[0].toLowerCase()}`, { to: args[0].toLowerCase() });
            message.member.voice.channel.join().then(conn => {
                console.log(translated.text)

                    googleTTS(translated.text, a, 1)
                        .then((url) => {
                            conn.play(url)
                        })
                        .catch((err) => {
                            console.error(err.stack);
                        });
                })
 
        }
   } 

}

module.exports.config = {
    name: "language",
    aliases: ['lang']
}