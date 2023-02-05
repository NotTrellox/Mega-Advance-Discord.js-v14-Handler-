const fs = require('fs');
module.exports = (client) => {
  let c = 0;
    fs.readdirSync(`${process.cwd()}/Events/`).filter((file) => file.endsWith('.js')).forEach((event) => {
      	require(`${process.cwd()}/Events/${event}`);
      c++;
    })
  setTimeout(() => {
client.logger(`[LOADERS] `.brightBlue + `Loaded ${c} Events`.brightGreen)
  }, 1000)
    let x = 0;
    fs.readdirSync(`${process.cwd()}/Modules/`).filter((file) => file.endsWith('.js')).forEach((modules) => {
      const mod = require(`${process.cwd()}/Modules/${modules}`)
      if (mod) mod.execute(client);
      x++;
      client.logger(`[LOADERS] `.brightBlue + `Loaded ${modules.split(`.js`)[0]} Module`.brightGreen)
    })
    setTimeout(() => {
      client.logger(`[LOADERS] `.brightBlue + `Loaded ${x} Modules`.brightGreen)
    }, 2000)
};