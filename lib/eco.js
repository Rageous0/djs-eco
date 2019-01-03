const fs = require("fs");
const Discord = require("discord.js");
const cli = new Discord.Client({disableEveryone: true});

const coins = require("./economy/coins.json");
const api = require("../conf/config.json");
const prefix = api.prefix;
const token = api.token;
const chance = api.s[3];

cli.on("message", message => {

let arg = message.content.split(" ");
let command = arg[0];
let argument = arg.slice(1);
if(message.author.bot) return;
if(message.content.startsWith(prefix)) return;

//add coins if user not detected
if(!coins[message.author.id]) {
  coins[message.author.id] = {
    coins: 0
  }
}

//earnChance - random int between 1-100
//used for earning coins randomizing
//values - coin values u can get, the lower the more common it is
let earnChance = Math.floor(Math.random() * 101) - 1;
let values = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 8, 8, 8, 8, 8, 8, 8, 8, 10, 10, 10, 10];
let val = values[Math.floor(Math.random() * values.length) - 1];

  //if earnChance seen above is less than chance execute this
  if(earnChance <= chance) {

//if no coins do this
if(!coins[message.author.id]) {
  coins[message.author.id] = {
    coins: 0 + parseInt(val)
  }
}

//if coins exists do this
if(coins[message.author.id]) {
  coins[message.author.id] = {
    coins: parseInt(coins[message.author.id].coins) + parseInt(val)
  } 
}

  //message saying you got coins and delete after 2500ms (2.5s)
  message.channel.send(`Congrats ${message.author.username} you got **${val}** coins!`).then(m => m.delete(2500));

  }

  //write coins to file if needed
  fs.writeFileSync(`${__dirname}/economy/coins.json`, JSON.stringify(coins), "utf-8");

});

cli.login(token);