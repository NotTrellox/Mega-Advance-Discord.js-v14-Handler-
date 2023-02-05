//=====================================| Import the Module |=====================================\

const color = require('colors');

//=====================================| Code |=====================================\

const client = require('..')
//=====================================| Code |=====================================\

client.on("shardResume", (id, replayedEvents, client) => {

  
        client.logger(`${color.brightBlue(`[SHARD ID RESUME]`)} ` + `[${id}]`.brightGreen);
        client.logger(`${color.brightBlue(`[SHARD RESUME]`)} ` + `${replayedEvents}`.brightGreen);
     if (client.setting.System.ShardLog){
         const channel = 
client.channels.cache.get(Config.SETTINGS.LogsSystem.ShardChannel); if (!channel) return;
       channel.send({embeds: [new EmbedBuilder()
                                .setAuthor({
                                    name: `Shard Log`,
                                    iconURL: "https://cdn.discordapp.com/emojis/909400386471858216.gif",
                                    url: client.support
                                })
                                .setDescription(`>>> **[Shard Resume] Shard id : ${id} Has Been Resumed**`)
                                .setColor(client.embed.successcolor)
                      .setFooter({ text: client.embed.footertext, iconURL: `${client.embed.footericon}`})
                            ]})

     }
    }
)
