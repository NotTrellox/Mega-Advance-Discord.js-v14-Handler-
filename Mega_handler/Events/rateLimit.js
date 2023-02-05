//=====================================| Import the Module |=====================================\

const color = require('colors');

const client = require('..')
//=====================================| Code |=====================================\

client.on("rateLimit", (rateLimitData, error) => {

  
        client.logger(`${color.brightBlue(`[RATE LIMIT]`)} ` + `${rateLimitData.method} ${rateLimitData.path}`.red);
    })

