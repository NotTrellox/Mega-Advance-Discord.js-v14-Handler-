//=====================================| Import the Module |=====================================\

const color = require('colors');

//=====================================| Code |=====================================\

const client = require('..')
//=====================================| Code |=====================================\

client.on("shardReconnecting", (id) => {
        client.logger(`${color.brightBlue(`[SHARD RECONNECTING]`)} ` + `[${id}]`.brightGreen);
     if (client.setting.System.ShardLog){
         const channel = 
client.channels.cache.get(Config.SETTINGS.LogsSystem.ShardChannel); if (!channel) return;
       channel.send({embeds: [new EmbedBuilder()
                                .setAuthor({
                                    name: `Shard Log`,
                                    iconURL: "https://cdn.discordapp.com/emojis/909400386471858216.gif",
                                    url: client.support
                                })
                                .setDescription(`>>> **[Shard Reconnecting] Shard id : ${id} Is Reconnecting**`)
                                .setColor(client.embed.successcolor)
                      .setFooter({ text: client.embed.footertext, iconURL: `${client.embed.footericon}`})
                            ]})

     }
    }
)