const { EmbedBuilder } = require(`discord.js`) 
require('ms');
module.exports = {
	name: 'e',
	description: "NewCommand",
  aliases: [""],
  category: "",
	cooldown: 0,
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
       
   const name = args.join(" ");
    const emoji = message.guild.emojis.cache.find((r) => r.name === name);
    if (!name) {
      return message.channel.send("Please type the emoji name");
    }
    if (!emoji) {
      return message.channel.send(
        "Couldn't find the Emojis with the provided name. Please make sure the Emoji name is correct"
      );
    }
        message.channel.send(`\`\`\`${emoji}\`\`\``);

      /////////====== Code End ======\\\\\\
    } catch (error) {
            client.msg_err(client, message, error);
    }
	}
};