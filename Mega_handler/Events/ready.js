const { version } = require(`discord.js`)
const Settings = require(`${process.cwd()}/Settings/settings.json`);
const Config = require(`${process.cwd()}/Settings/config.json`);
const Emoji = require(`${process.cwd()}/Settings/emojis.json`);
const Embed = require(`${process.cwd()}/Settings/embed.json`);
const { author } = require(`${process.cwd()}/package.json`);
const { ActivityType } = require('discord.js');
const  Discord = require('discord.js');
const { Client, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const date = require(`date-and-time`)

const today = date.format(new Date(), 'ddd, MMM DD YYYY'); 

const color = require('colors');
require('dotenv').config();
const ms = require('ms');
const client = require('..')
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setBorder('│', '─', "✥", "✥");  
table.setTitle(`Bot is online!`)
client.on("ready", () => {
   console.table({
          'Name': client.user.tag,
          'Author': `${author}`,
          'Version': `v${version}`,
          'Status': `${client.user.presence.status}`,
          'Prefix': Config.SETTINGS.PREFIX,
          'Discord.js': `v${Discord.version}`,
          'Node.js': `${process.version}`,
          'Guilds': client.guilds.cache.size,
          'Users': client.users.cache.size,
          'Channels': client.channels.cache.size,
          'Message Commands': client.commands.size,
         
          'Memory Usage': `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
          'CPU Usage': `${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%`,
          'Platform': process.platform,
          'Arch': process.arch,
      });
      
      client.logger(`${color.brightBlue(`[READY]`)} ` + `${client.user.tag} is online!`.brightGreen);
 
  //==============< Typing >==========\\
  if (client.setting.System.Typing){
    const channel = client.channels.cache.get(Config.SETTINGS.LogsSystem.TypeChannel);
    if (!channel) return console.log("[HANDLING ERROR] Can't Find Typing Channel Id. Please Put Id In config.json");
    setInterval(() => { 
  channel.sendTyping().catch(() => { /* */ }); }, 2000)
  client.logger(`[CHEKER] `.brightBlue + `Typing System Checked`.brightGreen)
  }
      //======================< Activity >======================\
  if (client.setting.Client.ActivityStatus && !client.setting.Client.PingStatus){
      setInterval(async () => {
        // Animated Status Presence
        const activities = [
          `${Config.SETTINGS.PREFIX}help`,
         `/help > ${client.guilds.cache.size} Guilds`,
        ];
        
  
       client.user.setActivity(activities[Math.floor(Math.random() * activities.length)], {
         type: ActivityType.Listening, // PLAYING, STREAMING, LISTENING, WATCHING
         url: "https://www.twitch.tv/",
      });
                    }, ms("5s"))}        
  if (client.setting.Client.PingStatus && !client.setting.Client.ActivityStatus){
          const { user, ws } = client;

    setInterval(() => {
      const ping = ws.ping;

      user.setActivity({
        name: `Ping: ${ping} ms`,
        type: ActivityType.Streaming,
      });
    }, ms("5s"))}
  client.logger(`[CHEKER] `.brightBlue + `Activity System Checked`.brightGreen)
    //  }, 30000)


  /// ==============< Voice Joining >=========\\\
  if (client.setting.System.VoiceJoin){
    const channel = client.channels.cache.get(Config.SETTINGS.LogsSystem.VoiceChannel);
    if (!channel) return console.log("[HANDLING ERROR] Can't Find Voice Channel Id To Join. Please Put Id In config.json");
    const connection = joinVoiceChannel({ 
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
    connection;
client.logger(`[CHEKER] `.brightBlue + `Voice Channel Joining System Checked`.brightGreen)
  }

  
   ///==============< Online Log >=======\\\
if (client.setting.System.OnlineLog){
  
  const Online = 
client.channels.cache.get(Config.SETTINGS.LogsSystem.OnlineChannel); if (!channel) return console.log("[HANDLING ERROR] Can't Find Online Log Channel Id. Please Put Id In config.json");
Online.send({embeds: [new EmbedBuilder()
                                .setAuthor({
                                    name: `Online Log`,
                                    iconURL: "https://cdn.discordapp.com/emojis/891217279361118249.png",
                                    url: client.support
                                })
                                .setDescription(`>>> **${client.user.tag} Has Been Ready And Got Online At ${today}**`)
                                .setColor(client.embed.successcolor)
                      .setFooter({ text: client.embed.footertext, iconURL: `${client.embed.footericon}`})
                            ]})
  client.logger(`[CHEKER] `.brightBlue + `Online Logging System Checked`.brightGreen)

}
  let emojitt = process.env.emojitt
  
  if (!emojitt){
console.log("This Handler Has Some Custom Emojis So For Access Go To https://dsc.gg/we-coders And Get Instruction How To Get Access")
  }
   
 
});
