
//////////////=========Slash Loader============\\\\\\\\\\
const fs = require('fs');
const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const config = require(`${process.cwd()}/Settings/config.json`);
const set = require(`${process.cwd()}/Settings/settings.json`);
require("colors");
module.exports = {
  async execute(client) {
    const TOKEN = config.Client.TOKEN|| process.env.TOKEN;
    const CLIENT_ID = client.config.Client.CLIENT_ID || client.id;
    const GUILD_ID = client.config.SERVER_ID.OFFICAL || client.config.SERVER_ID.TEST;
    const rest = new REST({ version: '9' }).setToken(TOKEN);
    const slashCommands = [];
    let x = 0;
    fs.readdirSync(`${process.cwd()}/Commandlist/Slash/`).forEach(async dir => {
      const files = fs.readdirSync(`${process.cwd()}/Commandlist/Slash/${dir}/`).filter(file => file.endsWith('.js'));

      for (const file of files) {
        const slashCommand = require(`${process.cwd()}/Commandlist/Slash/${dir}/${file}`);
        slashCommands.push({
          name: slashCommand.name,
          description: slashCommand.description,
          type: slashCommand.type,
          options: slashCommand.options ? slashCommand.options : null,
          default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
          default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
        });
        x++;
        if (slashCommand.name) {
          client.slashCommands.set(slashCommand.name, slashCommand)
        } else {
          console.log(`Command Error: ${slashCommand.name || file.split('.js')[0] || "Missing Name"}`.brightRed)
        }
      }
    });
    (async () => {
      try {
        await rest.put(
          !set.System.Slash_Global ?
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID) :
            Routes.applicationCommands(CLIENT_ID),
          { body: slashCommands }
        ).catch((e) => { console.log((e.message).bold.red) });
        setTimeout(() => {
          client.logger(`[LOADERS] `.brightBlue + `Loaded ${x} Slash Commands`.brightGreen)
        }, 1500)
      } catch (error) {
        client.logger(`[ERROR LOG] ` + `${error}`);
      }
    })();
  }
};
