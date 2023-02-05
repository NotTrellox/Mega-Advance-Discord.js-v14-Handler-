//=====================================| Import the Module |=====================================\

const color = require('colors');

//=====================================| Code |=====================================\

const client = require('..')
//=====================================| Code |=====================================\

client.on("reconnecting", (client) => {
        client.logger(`${color.brightBlue(`[RECONNECTING]`)} ` + `${client.user.tag}`.red);
    }
)