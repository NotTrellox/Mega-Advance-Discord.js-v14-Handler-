const { Discord, EmbedBuilder } = require('discord.js');

module.exports = {
	name: "",
	description: "Command",
  usage: "",
  category: "",
	userPerms: [""],
	botPerms: [""],
	cooldown: 30,
  guildOnly: false,
  ownerOnly: false,
  toggleOff: false,
  nsfwOnly: false,
  maintenance: false,
	type: ApplicationCommandType.ChatInput,
	run: async (client, interaction) => {
    try {     
       
    }catch (error) {
            client.slash_err(client, interaction, error);
        }
	}
};