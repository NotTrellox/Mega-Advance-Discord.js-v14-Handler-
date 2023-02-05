const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, Client, Collection } = require('discord.js');

const bot = require(`${process.cwd()}/bot.js`)
const Settings = require(`${process.cwd()}/Settings/settings.json`);;
const client = new Client(bot());
const color = require('colors');
require('ms');
const { slash, prefix } = require(`${process.cwd()}/Functions/cmdErrorLogs.js`);
client.config = require(`${process.cwd()}/Settings/config.json`);;
client.embed = require(`${process.cwd()}/Settings/embed.json`);
client.setting = require(`${process.cwd()}/Settings/settings.json`);
client.emotes = require(`${process.cwd()}/Settings/emojis.json`);;
  client.schema = (schema_name) => require(`${process.cwd()}/Database/${schema_name}`);
client.prefix = client.config.SETTINGS.PREFIX;
client.categories = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.slash_err = slash;
client.msg_err = prefix;
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.owners =  client.config.DEVELOPER.OWNER.concat(
                client.config.DEVELOPER.CO_OWNER
            )
client.owner = client.config.DEVELOPER.OWNER
client.support = client.config.CONNECTIONS.DISCORD_SUPPORT || "https://dsc.gg/we-coders"


 client.Embed = (footer = true) => {
      let embed = new EmbedBuilder();
      if (!embed.color) embed.setColor(client.embed.color);
      if (footer) embed.setFooter({ text: client.embed.footertext, iconURL: client.embed.footericon });
      return embed;
    };

module.exports = client;


  [`log`, `server`, `command`, `events`, `anticrash`, 'slash', 'mongo',  'autokill'].forEach((handler) => {
  const file = require(`${process.cwd()}/Handlers/${handler}`)
  if (file.execute) file.execute(client);
  else file(client);
});





  

//=====================================| LOGIN TO BOT |=====================================\\
try { 
  client.login(client.config.Client.TOKEN || process.env.TOKEN);
  } catch (error) {
            client.msg_err(client, message, error);
    }


