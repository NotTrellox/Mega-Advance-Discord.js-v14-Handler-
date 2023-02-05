//=====================================| Import the Module |=====================================\

const color = require('colors');

//=====================================| Code |=====================================\


const client = require('..')
//=====================================| Code |=====================================\

client.on("shardDisconnect", (event, id, client) => {
    
        client.logger(`${color.brightBlue(`[SHARD ID DISCONNECT]`)} ` + `[${id}]`.red);
        client.logger(`${color.brightBlue(`[SHARD EVENT DISCONNECT]`)} ` + `${event}`.red);
     if (client.setting.System.ShardLog){
         const channel = 
client.channels.cache.get(Config.SETTINGS.LogsSystem.ShardChannel); if (!channel) return;
       channel.send({embeds: [new EmbedBuilder()
                                .setAuthor({
                                    name: `Shard Log`,
                                    iconURL: "https://cdn.discordapp.com/emojis/909400386471858216.gif",
                                    url: client.support
                                })
                                .setDescription(`>>> **[Shard Disconnect] Shard id : ${id} Has Been Disconnected Because - ${event}**`)
                                .setColor(client.embed.successcolor)
                      .setFooter({ text: client.embed.footertext, iconURL: `${client.embed.footericon}`})
                            ]})

     }
    })



