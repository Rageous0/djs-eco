const fs = require("fs");

//core features
module.exports.settings = function(prefix, token, command, debug) {
  this.prefix = prefix; //String
  this.token = token;  //String
  this.command = command; //Object
  this.debug = debug || false; //Boolean
  
  //Check if something is missing.
  if(!this.prefix) throw Error("Missing data for prefix.");
  if(!this.token) throw Error("Missing data for token.");
  if(!this.command) throw Error("Missing object for command.");
  if(!command.eBet) throw Error("Missing object data for eBet.");
  if(!command.eBet[0]) throw Error("Missing boolean for eBet array item 1.");
  if(!command.eBet[1]) throw Error("Missing winninc chance (number) for eBet array item 2.");
  if(!command.eBal) throw Error("Missing object data for eBal.");
  if(!command.ePay) throw Error("Missing object data for ePay.");
  if(!command.chance) throw Error("Missing object data for chance.");
  if(!this.debug) throw Error("Missing options for debug");
  
  //Validate types
  if(typeof this.prefix !== "string") throw TypeError("Prefix must be type of string.");
  if(typeof this.token !== "string") throw TypeError("Token must be type of string.");
  if(typeof this.command !== "object") throw TypeError("Command must be type of object.");
  if(typeof command.eBal !== "boolean") throw TypeError("eBal command data must be type of boolean.");
  if(typeof command.ePay !== "boolean") throw TypeError("ePay command data must be type of boolean.");
  if(!Array.isArray(command.eBet)) throw TypeError("eBet command data must be type of array.");
  if(typeof command.eBet[0] !== "boolean") throw TypeError("First item of eBet array must type of boolean");
  if(isNaN(command.eBet[1]) || typeof command.eBet[1] !== "number") throw TypeError("Second item of eBet array must be type of number");
  if(command.eBet[1] < 0 || command.eBet[1] > 100) throw RangeErroe("Second item of eBet array requires a number between 0-100");
  if(isNaN(command.chance) || typeof command.chance !== "number") throw TypeError("chance command data must be type of number.");
  if(command.chance <= 0 || command.chance > 50) throw RangeError("chance command data must be between 1-50.");
  if(typeof this.debug !== "boolean") throw TypeError("Debug must be type of boolean");
  
    let settings = {
      prefix: this.prefix,
      token: this.token,
      s: [command.eBal, command.ePay, command.eBet, command.chance],
      debug: this.debug
    }

  fs.writeFileSync(`${__dirname}/conf/config.json`, JSON.stringify(settings), "utf-8");

}

  function load() {
    require("./lib/eco.js")
    require("./lib/commands.js");
  }

  setTimeout(function() {
    load();
  }, 5);