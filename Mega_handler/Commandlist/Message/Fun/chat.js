const { EmbedBuilder } = require(`discord.js`) 
const os = require('os');

const { chatBot } = require('reconlx') 
require('ms');
module.exports = {
	name: 'chat',
	description: "Chat With Code Manager By Using This Command",
  aliases: [""],
  category: "",
	cooldown: 10,
  guildOnly: false,
  ownerOnly: false,
  toggleOff: false,
  nsfwOnly: false,
  maintenance: false,
	botPerms: "ViewChannel",
	userPerms: "ViewChannel",
	run: async (client, message, args) => {
    try {
     
        const Chatbot  =  require("discord-chatbot");

const chatbot  =  new  Chatbot({name: "Coddy", gender: "Male"});

chatbot.chat(message).then(response=>message.reply(response)).catch(e => console.log(e));

    } catch (error) {
            client.msg_err(client, message, error);
    }
	}
};