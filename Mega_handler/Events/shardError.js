//=====================================| Import the Module |=====================================\
const client = require('..')
const color = require('colors');

//=====================================| Code |=====================================\

client.on("shardError", (id, client, error) => {
     client.logger(`[SHARD SYSTEM]`.brightBlue + `Shard #${id} Errored`.red);
        console.log(`${color.brightBlue(`[SHARD ERROR]`)} ` + `${error}`.red);
     if (client.setting.System.ShardLog){
         const channel = 
client.channels.cache.get(Config.SETTINGS.LogsSystem.ShardChannel); if (!channel) return;
       channel.send({embeds: [new EmbedBuilder()
                                .setAuthor({
                                    name: `Shard Log`,
                                    iconURL: "https://cdn.discordapp.com/emojis/909400386471858216.gif",
                                    url: client.support
                                })
                                .setDescription(`>>> **[Shard Error] Shard id : ${id} Has Got Error - ${error}**`)
                                .setColor(client.embed.successcolor)
                      .setFooter({ text: client.embed.footertext, iconURL: `${client.embed.footericon}`})
                            ]})
  
     }
    })
