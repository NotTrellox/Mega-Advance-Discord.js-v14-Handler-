const client = require('..')
const Discord = require("discord.js");
//=====================================| Code |=====================================\

client.on("threadCreate", async(client, thread) => {
   try {
     if (thread.joinable) await thread.join();
       
      
    } catch (e) {
      client.logger(e)
    }
  
})