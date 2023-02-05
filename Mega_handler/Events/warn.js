
const color = require('colors');

//=====================================| Code |=====================================\
const client = require('..')
client.on("warn", (error) => {

  client.logger(`${color.brightBlue(`[WARNING]`)}` + `${color.red(`${error}`)}`)
})
