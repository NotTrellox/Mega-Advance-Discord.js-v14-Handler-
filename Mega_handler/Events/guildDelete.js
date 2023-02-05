const client = require('..')
const { Discord, EmbedBuilder } = require("discord.js")
client.on("guildDelete", async (guild) => {

/////=============< Guild Log >===========\\\
  if (client.setting.System.GuildLog){
    const channel = client.channels.cache.get(client.config.SETTINGS.LogsSystem.GuildChannel);
    if (!channel) return console.log("[HANDLING ERROR] Can't Find Guild Channel Id. Please Put Id In config.json");

  channel.send({
    embeds: [new EmbedBuilder()
              .setAuthor({
                                    name: `Guild Leave Log`,
                                    iconURL: "https://cdn.discordapp.com/emojis/1061494827214176317.webp?size=44&quality=lossless",
                                    url: client.support
                                })
             .addFields({ name: `**${client.emotes.MESSAGE.home} Guild info**`, value: `**${client.emotes.MESSAGE.discord} Guild name - ${guild.name}\n${client.emotes.MESSAGE.id} Guild Id - ${guild.id}\n${client.emotes.MESSAGE.member} Guild members - ${guild.memberCount}**`, inline: false })

.addFields({ name: `**${client.emotes.MESSAGE.crown} Owner info**`, value: `**${client.emotes.MESSAGE.crown} Owner Name - <@${guild.ownerId}> [${client.user.tag}]\n${client.emotes.MESSAGE.id} Guild Owner Id - ${guild.ownerId}**`, inline: false })

.addFields({ name: `**${client.emotes.MESSAGE.bot} Bot Stats**`, value: `**${client.emotes.MESSAGE.home} Total Guild - ${client.guilds.cache.size}\n${client.emotes.MESSAGE.member} Total User - ${client.users.cache.size}**`, inline: false })
              .setColor(client.embed.successcolor)
                      .setFooter({ text: client.embed.footertext, iconURL: `${client.embed.footericon}`})
      ]
  })
}
 


  
})