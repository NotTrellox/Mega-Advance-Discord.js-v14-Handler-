const client = require('..')
const { EmbedBuilder, Collection, PermissionsBitField, ChannelType } = require('discord.js')
const ms = require('ms')
const prefix = client.prefix;
const cooldown = new Collection()
const { msg } = require(`${process.cwd()}/Functions/onCoolDown.js`);
const config = client.config
const embed = client.embed
const emojis = client.emotes
const date = require(`date-and-time`)

const today = date.format(new Date(), 'ddd, MMM DD YYYY, hh:mm A [GMT]Z');
// ================================================================================
client.on('messageCreate', async message => {
  try {

// ==============================< Command Handling >=============================\\

    // ==================< Checking Is Bot >=============== \\
	if(message.author.bot) return;

   // ===================< Dm Log >================= \\
    if(message.channel.type === ChannelType.DM){
      if (client.setting.System.DmLog){
         const dmchannel = 
client.channels.cache.get(client.config.SETTINGS.LogsSystem.DmChannel); if (!dmchannel) return console.log("[HANDLING ERROR] Can't Find Dm Log Channel Id. Please Put Id In config.json");
        dmchannel.send({
          embeds:[new EmbedBuilder()
                    .setAuthor({
                                    name: `Dm Log`,
                                    iconURL: "https://cdn.discordapp.com/emojis/1057270731475521597.webp?size=44&quality=lossless",
                                    url: client.support
                                })
                                .setDescription(`>>> **[Got Dm] \n${client.emotes.MESSAGE.messageedit} Content - ${message.content}\n${client.emotes.MESSAGE.clock} Time - ${today}\n${client.emotes.MESSAGE.plane} Sent By ${message.author.tag}**`)
                                .setColor(client.embed.successcolor)
                      .setFooter({ text: client.embed.footertext, iconURL: `${client.embed.footericon}`})
                 ]
        })
      }
    }

   // ==================< Checking The Channel Type >=================\\
	if(message.channel.type !== 0 && !message.channel.isThread()
) return;
  
  
    
  

  
      
	if(!message.content.startsWith(prefix)) return; 
	const args = message.content.slice(prefix.length).trim().split(/ +/g); 
	const cmd = args.shift().toLowerCase();
    	
	if(cmd.length == 0 ) return;
	let command = client.commands.get(cmd)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmd))
    || client.commands.find(cmd => cmd.cooldowns && cmd.cooldowns.includes(cmd))
    || client.commands.find(cmd => cmd.category && cmd.category.includes(cmd))
    || client.commands.find(cmd => cmd.descriptions && cmd.descriptions.includes(cmd))
    || client.commands.find(cmd => cmd.usage && cmd.usage.includes(cmd));
// ==============================< If command doesn't found >=============================\\
	 if(!command) command = client.commands.get(client.aliases.get(cmd));       
    if (!command) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.embed.wrongcolor)
                        .setDescription(`${emojis.MESSAGE.x} The command \`${cmd}\` does not exist.`)
                ]
            }).then(m => setTimeout(() => m.delete(), 6000));
        }
    // ===================< Important Check >===============\\

     
// ==============================< Other Command Handling list >=============================\\
	if(command) {
    try {

// ==============================< Maintance >================\\

          if (client.setting.Client.Maintance) {
                       if (!client.owners.includes(message.author.id)) return await message.reply({
                            embeds: [new EmbedBuilder()
                                .setAuthor({
                                    name: `Maintenance Mode On`,
                                    iconURL: "https://cdn.discordapp.com/emojis/1012039176469884988.png",
                                    url: client.support
                                })
                                .setDescription(`>>> *Please use the bot after sometime! Currently bot is in **Maintenance Mode**!*`)
                                .setColor(client.embed.wrongcolor)
                            ]
                        })
                    }
// ==============================< Toggle off >=============================\\

      if (command.toggleOff) {
                        return await message.reply({
                            embeds: [new EmbedBuilder()
                                .setDescription(`${emojis.MESSAGE.x} **That Command Has Been Disabled By The Developers! Please Try Later.**`)
                              .setColor(client.embed.wrongcolor)
                            ]
                        }).then(msg => {
                            setTimeout(() => {
                                msg.delete().catch((e) => {
                                    console.log(String(e).grey)
                                })
                            }, 6000)
                        }).catch((e) => {
                            console.log(String(e).grey)
                        });
                    }
// ==============================< On Mainenance Mode >============================= \\
      if (command.maintenance){
                    return await message.reply({
                      content: `${emojis.MESSAGE.x} **${command.name} command is on __Maintenance Mode__** try again later!`
                    })
                  }
// ==============================< Owner Only >============================= \\
      if (command.ownerOnly) {
        const owners = client.config.DEVELOPER.OWNER.concat(
                client.config.DEVELOPER.CO_OWNER
            );
        if (!client.owners.includes(message.author.id)) return await message.reply({
                            embeds: [new EmbedBuilder()
                                .setDescription(`${emojis.MESSAGE.x} **You cannot use \`${prefix}${command.name}\` command as this is a developer command.**`).setColor(client.embed.wrongcolor)
                            ]
                        }).then(msg => {
                            setTimeout(() => {
                                msg.delete().catch((e) => {
                                    console.log(String(e).grey)
                                })
                            }, 6000)
                        }).catch((e) => {
                            console.log(String(e).grey)
                        });
                    }

      // ================Mod Only================\\

       if (command.modOnly) {
        const owners = client.config.MOD.MODS
        if (!owners.includes(message.author.id)) return await message.reply({
                            embeds: [new EmbedBuilder()
                                .setDescription(`${emojis.MESSAGE.x} **You cannot use \`${prefix}${command.name}\` command as this is a mod command.**`).setColor(client.embed.wrongcolor)
                            ]
                        }).then(msg => {
                            setTimeout(() => {
                                msg.delete().catch((e) => {
                                    console.log(String(e).grey)
                                })
                            }, 6000)
                        }).catch((e) => {
                            console.log(String(e).grey)
                        });
                    }
// ==============================< Permissions checking >============================= \\
    if(command.userPerms || command.botPerms) {       				
      if(!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`${emojis.MESSAGE.x} ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
						.setColor(client.embed.wrongcolor)
						return message.reply({ embeds: [userPerms] })
					}
					if(!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`${emojis.MESSAGE.x} ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
						.setColor(client.embed.wrongcolor)
						return message.reply({ embeds: [botPerms] })
					}
    }
// ==============================< NSFW checking >============================= \\
      if (command.nsfwOnly && !message.channel.nsfw) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${emojis.MESSAGE.x} ${message.author.username} This command only works in NSFW channels!`)
                        .setDescription(`Please go to the NSFW channel to use this command!`)
                       .setColor(client.embed.wrongcolor)
                    ]
                
            }).then(m => setTimeout(() => m.delete(), 6000));    
      } 
// ==============================< Only for offical guilds >============================= \\
        if (command.guildOnly) {
          const private = client.config.SERVER.OFFICIAL.Guild_ID_1
            .concat(client.config.SERVER.Guild_ID_2);
          if(!private.includes(message.guild.id)){
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${emojis.MESSAGE.x} ${message.author.username} You have entered an invalid command!`)
                        .setDescription(`The command \`${command.name}\` can only be used in the official server.`)   
                        .setColor(client.embed.wrongcolor)
                    ]
            }).then(m => setTimeout(() => m.delete(), 6000));
          }   
        }
// ==============================< CoolDown checking >============================= \\
        if (msg(message, command)) {
            return await message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${emojis.MESSAGE.x} ${message.author.username}, You have been cooldown for \`${command.cooldown}\` seconds!`)
                        .setDescription(`Please wait \`${msg(message, command).toFixed(1)}\` Before using the \`${command.name}\` command again!`)
                      .setColor(client.embed.wrongcolor)
                    ]
                }).then(m => setTimeout(() => m.delete(), msg(message, command) * 1000));
            }
// ==============================< Start The Command >============================= \\
      await command.run(client, message, args)
      if(client.setting.System.CommandLog){
      const commandLogsChannel = client.channels.cache.get(client.config.SETTINGS.LogsSystem.CommandChannel);
      if (!commandLogsChannel) return console.log("[HANDLING ERROR] Can't Find Command Log Channel Id. Please Put Id In config.json");
      commandLogsChannel.send({
                        embeds: [new EmbedBuilder()
                            .setColor(client.embed.color)
                            .setAuthor({name: "Prefix Command", iconURL: "https://cdn.discordapp.com/emojis/1057270731475521597.webp?size=44&quality=lossless"})
                            
                             .addFields([
                                 { name: "**Author**",value: `\`\`\`yml\n${message.author.tag} [${message.author.id}]\`\`\``},
                                 { name: "**Command Name**", value: `\`\`\`yml\n${command.name}\`\`\`` },
                                 { name: `**Guild**`, value: `\`\`\`yml\n${message.guild.name} [${message.guild.id}]\`\`\`` }
                             ])                       
                        ]
                    });
      }
// ==============================< On Error >============================= \\
    } catch (error) {
                    console.log(error)
                    return message.reply({
                        embeds: [new EmbedBuilder()
                            .setTitle(`${emojis.MESSAGE.x} Something went wrong while, running the: ${prefix}${command.name} command`).setColor(client.embed.wrongcolor)
                        ]
                    }).then(msg => {
                        setTimeout(() => {
                            msg.delete().catch((e) => {
                                console.log(String(e).grey)
                            })
                        }, 4000)
                    }).catch((e) => {
                        console.log(String(e).grey)
                    });
    }
  }  
  
 
  } catch (error) {
    client.msg_err(client, message, error);      
  } 	
});
