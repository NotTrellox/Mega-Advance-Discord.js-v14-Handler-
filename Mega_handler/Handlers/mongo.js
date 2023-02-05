const mongoose = require('mongoose');
const colors = require('colors');
const Config = require(`${process.cwd()}/Settings/config.json`)
//=====================================| Code |=====================================\\
const Mongo = Config.CONNECTIONS.MONGO_URI || process.env.MONGO_URI || "mongodb+srv://ProLOL:12345@cluster0.kd5bh.mongodb.net/?retryWrites=true&w=majority"
const ms = require("ms")
const db = require('quick.db')
const { EmbedBuilder} = require("discord.js")

module.exports = {
  async execute(client) {
    if (client.setting.Client.Mongo){
    try {
    
        mongoose.connect(Mongo, {
          autoIndex: false,
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
          family: 4,
        }).then(() => client.logger(`${colors.brightBlue(`[MONGO]`)} ` +`Connected to MongoDB`.brightGreen))
          .catch((err) => console.log(`${colors.brightBlue(`[MONGO]`)} ` + `MongoDB Has Stopped\n`.red, err)) 
    
    } catch (e) {
      client.logger(`[MONGO ERROR LOG] `.brightBlue + `${e.stack}`.red + `${e}`.bold.red);

    
  }
    } else return client.logger(`[CHEKER]`.brightBlue + `Mongo Is Disabled In Settings`.brightGreen)
  

  /// ===========< Shard Ready >======\\\
  
const id = db.fetch('Shard')
     setTimeout(() => {
     if (client.setting.System.ShardLog){
         const channel = 
client.channels.cache.get(Config.SETTINGS.LogsSystem.ShardChannel); if (!channel) return console.log("[HANDLING ERROR] Can't Find Shard Log Channel Id. Please Put Id In config.json");
       channel.send({embeds: [new EmbedBuilder()
                                .setAuthor({
                                    name: `Shard Log`,
                                    iconURL: "https://cdn.discordapp.com/emojis/909400386471858216.gif",
                                    url: client.support
                                })
                                .setDescription(`>>> **[Shard Ready] Shard id : ${id} Has Been Ready**`)
                                .setColor(client.embed.successcolor)
                      .setFooter({ text: client.embed.footertext, iconURL: `${client.embed.footericon}`})
                            ]})
  client.logger(`[CHEKER] `.brightBlue + `Shard Logging System Checked`.brightGreen)
     }
}, ms("5s"))


}
}