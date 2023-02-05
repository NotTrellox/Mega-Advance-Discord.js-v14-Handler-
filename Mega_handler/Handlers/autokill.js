const color = require('colors');
module.exports = async (client) => {
  if (client.setting.Replit.autokill && client.setting.Replit_User) {

  setInterval(() => {
  if (!client || !client.user) {
    client.logger(`[AUTOKILL] `.brightBlue +"Client Not Login, Process Kill".bold.red)
    process.kill(1);
  }
}, 3 * 1000 * 60);

  }

}