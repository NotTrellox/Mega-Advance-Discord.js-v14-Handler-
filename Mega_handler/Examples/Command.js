const { EmbedBuilder } = require(`discord.js`) 
require('ms');
module.exports = {
	name: '',
	description: "NewCommand",
  aliases: [""],
  category: "",
	cooldown: 10,
  guildOnly: false,
  ownerOnly: false,
  modOnly: false,
  toggleOff: false,
  nsfwOnly: false,
  maintenance: false,
	botPerms: "ViewChannel",
	userPerms: "ViewChannel",
	run: async (client, message, args) => {
    try {
     //////====== Code Start ========\\\\\\
       


      /////////====== Code End ======\\\\\\
    } catch (error) {
            client.msg_err(client, message, error);
    }
	}
};