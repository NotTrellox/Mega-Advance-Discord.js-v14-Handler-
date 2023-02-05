const boxConsole = require('box-console');
module.exports = async (client) => {
let server = `Starting ${'Server Handler'.bold.blue} by ${'Trenny Development'.red}`;
let link = `Support:- ${`https://dsc.gg/we-coders`.brightGreen}`
let code = `Coded By ${`Trellox`.brightCyan.bold}`
  let copy1 =  (`Must Give Credits Or Copyright Will Given`.bold.red)
  let copy2 = `All Credits ${`Reserved`.brightGreen}`
  
 console.clear()
  boxConsole([server, link, code, copy1 , copy2]);
  // Console Logger
  client.logger = (data) => {
    var currentdate = new Date();
    let logstring = ` ${`${`${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`.brightBlue.bold} ${`│`.brightMagenta.bold}`
                     }`
    if (typeof data == "string") {
      console.log(logstring, data.split("\n").map(d => `${d}`.green).join(`\n${logstring} `))
    } else if (typeof data == "object") {
      console.log(logstring, JSON.stringify(data, null, 3).green)
    } else if (typeof data == "boolean") {
      console.log(logstring, String(data).cyan)
    } else {
      console.log(logstring, data)
    }
  };

  
}