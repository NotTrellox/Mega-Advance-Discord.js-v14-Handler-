
const Settings = require(`${process.cwd()}/Settings/settings.json`);
const color = require('colors');
const client = require('..')
//=====================================| Code |=====================================\

client.on("debug", (info, error) => {
      if (Settings.System.Debug) {
          client.logger(`${color.brightBlue(`[DEBUG]`)} ` + `${String(info)}`.brightGreen);
        }
  
    })
  