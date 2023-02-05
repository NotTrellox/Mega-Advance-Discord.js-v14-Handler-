const setting = require(`${process.cwd()}/Settings/settings.json`)
const colors = require('colors');
module.exports = async (client) => {
  if (setting.Replit.express){
    const express = require('express');
    const app = express();
    const port = 8080;
    app.all('/', (req, res) => {  
      res.send(`Express Activated`);
      res.end();
    });
    app.listen(port, () => client.logger(`[EXPRESS SYSTEM] `.brightBlue + `Bot running on http://localhost:${port}`.brightGreen));
  }
}