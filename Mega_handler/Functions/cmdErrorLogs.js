
//////////========Error-Log-System=========\\\\\\\\\\
const { EmbedBuilder, MessageManager } = require('discord.js');
const set = require(`${process.cwd()}/Settings/settings.json`)
require(`colors`)
module.exports.slash = slash;
module.exports.prefix = prefix;

// function slash
function slash(client, interaction, error) {
  let SupportUrl = client.config.CONNECTIONS.DISCORD_SUPPORT || "https://discord.gg/bS6YrKjzTk";
  console.log(error.stack ? String(error.stack).red : String(error).red)
  interaction.reply({
    embeds: [new EmbedBuilder()
      .setColor(client.embed.color)
      .setAuthor({ name: `An error has occured! Try again later!`, url: SupportUrl})
    ],
    ephemeral: true
  }).catch((e) => {
    interaction.channel.send({
      content: `${interaction.user}`,
      embeds: [new EmbedBuilder()
        .setColor(client.embed.color)
        .setAuthor({ name: ` An error has occured! Try again later!`, url: SupportUrl })],
    }).then(m => setTimeout(() => m.delete(), 9000));
  })
  if (set.System.CommandErrLog && client.config.SETTINGS.LogsSystem.ErrorChannel) client.channels.cache.get(client.config.SETTINGS.LogsSystem.ErrorChannel).send({
    embeds: [
      new EmbedBuilder()
        .setColor("#00ffaa")
        .setTitle(`${client.emotes.MESSAGE.x} Error System [INTERACTION COMMANDS]`)
        .setDescription(`_An error has occured_.\n\n**Error Code:** \`${error.name}\`\n**Error Message:** \`${error.message}\`\n**Stack:** \`\`\`yml\n${error.stack}\`\`\``)
        .setFooter({ text: `Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB | CPU: ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}% | Ping: ${Date.now() - interaction.createdTimestamp}ms` })
        .addFields([
          { name: "Guild", value: interaction.guild.name, inline: true },
          { name: "ID", value: interaction.guild.id, inline: true }
        ])
    ]
  });
}
 /////======Function Prefix=========\\\\\\\\
function prefix (client, message, error) {
  let SupportUrl = client.config.CONNECTIONS.DISCORD_SUPPORT || "https://discord.gg/bS6YrKjzTk";
    console.log(String((error.stack).red))
    client.channels.cache.get(client.config.SETTINGS.LogsSystem.ErrorChannel).send({
        embeds: [
            new EmbedBuilder()
                .setColor(`#00FFFF`)
                .setTitle(`${client.emotes.MESSAGE.x} Error System [MESSAGE COMMANDS]`)
                .setDescription(`_An error has occured_.\n\n**Error Code:** \`${error.name}\`\n**Error Message:** \`${error.message}\`\n**Stack:** \`\`\`yml\n${error.stack}\`\`\``)
                .setFooter({text: `Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB | CPU: ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}% | Ping: ${Date.now() - message.createdTimestamp}ms`})
          .addFields([
            {name: "Guild", value: message.guild.name, inline: true},
            {name: "ID", value: message.guild.id, inline: true}
          ])
            ]
    });
  message.reply({
    embeds: [new EmbedBuilder()
      .setColor(client.embed.color)
      .setAuthor({ name: `AN ERROR OCCURED`, url: SupportUrl, iconUrl : `https://cdn.discordapp.com/emojis/1057273820215529522.gif?size=44&quality=lossless` })
    ],
    ephemeral: true
  }).then(m => setTimeout(() => m.delete(), 9000)).catch ((e) => {
      
    message.channel.send({
      content: `${interaction.user}`,
      embeds: [new EmbedBuilder()
        .setColor(client.embed.color)
        .setAuthor({ name: `AN ERROR OCCURED`, url: SupportUrl, iconUrl : `https://cdn.discordapp.com/emojis/1057273820215529522.gif?size=44&quality=lossless` })],
    }).then(m => setTimeout(() => m.delete(), 9000))
         client.logger(`[COMMAND ERROR LOG] `.brightBlue + `${e.stack}`.red + `${e}`.bold.red);
  })
    
}

