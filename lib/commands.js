const fs = require("fs");
const Discord = require("discord.js");
const cli = new Discord.Client({disableEveryone: true});

const coins = require("./economy/coins.json");
const api = require("../conf/config.json");
const prefix = api.prefix;
const token = api.token;
const eBal = api.s[0];
const ePay = api.s[1];
const eBet = api.s[2]; 
const debug = api.debug;

cli.on("message", message => {
let arg = message.content.split(" ");
let command = arg[0];
let argument = arg.slice(1);
if(message.author.bot) return;
if(!message.content.startsWith(prefix)) return;

if(eBal == true) {

if(command === `${prefix}coins`) {

  if(debug == true) {
  	console.log(message.author.id + ': used the coins command');
      console.log('Bot response: ' + cli.ping + 'ms');
      console.log('Bot ID: ' + cli.user.id);
  }

  let u = message.mentions.users.first();
  if(u && u.bot) return message.reply("Cannot check balance for a bot!");

  //if no coins add them
  if(!coins[message.author.id]) {
    coins[message.author.id] = {
      coins: 0
    }
    fs.writeFileSync(`${__dirname}/economy/coins.json`, JSON.stringify(coins), "utf-8");
  }

  //if extra args return this
  if(!argument[1]);

  let bt = message.mentions.users.first() || message.author;

  if(bt != message.mentions.users.first()) {
    message.channel.send(`*Your* balance is **${coins[message.author.id].coins}**.`);
  } else {
    if(!coins[message.mentions.users.first().id]) {
      coins[message.mentions.users.first().id] = {
        coins: 0
      }
      fs.writeFileSync(`${__dirname}/economy/coins.json`, JSON.stringify(coins), "utf-8");
    }

    message.channel.send(`*${message.mentions.users.first().username}'s* balance is **${coins[message.mentions.users.first().id].coins}**.`);
  }

  return;

}

}


if(ePay == true) {

if(command === `${prefix}pay`) {
	
  if(debug == true) {
  	console.log(message.author.id + ': used the pay command');
      console.log('Bot response: ' + cli.ping + 'ms');
      console.log('Bot ID: ' + cli.user.id);
  }

  let u = message.mentions.users.first();

  if(!u) return message.reply("Please specify a user to pay then an amount to pay him/her."); 

  if(u == message.member.user) return message.reply("Cannot pay yourself!");

  if(u.bot) return message.reply("You cannot give money to a bot!");

  //add coins to users if not stored
  if(!coins[message.author.id].coins) {
    coins[message.author.id] = {
      coins: 0
    }
    fs.writeFileSync(`${__dirname}/economy/coins.json`, JSON.stringify(coins), "utf-8");
  }

if(u) {
  if(!coins[u.id]) {
    coins[u.id] = {
      coins: 0
    }
  }
  fs.writeFileSync(`${__dirname}/economy/coins.json`, JSON.stringify(coins), "utf-8");
}

  //if extra args return this
  if(argument[2]) return;

  //if no user and/or integer is entered execute this
  if(!argument[0] || !argument[1]) return message.reply("Please specify a user to pay then an amount to pay him/her."); 

  if(argument[0] === message.author) return message.reply("Cannot pay yourself!");

  if(argument[0] && argument[1] > coins[message.author.id].coins) return message.reply("Not enough coins!");

  if(argument[0] && 1 > argument[1]) return message.reply("Cannot pay 0 coins or less!");

  if(argument[0] && u && argument[1]) {

  if(!coins[u.id]) {
    coins[u.id] = {
      coins: 0
    }
    fs.writeFileSync(`${__dirname}/economy/coins.json`, JSON.stringify(coins), "utf-8");
  }

  //remove coins from the one giving coins
  if(coins[message.author.id]) {
    coins[message.author.id] = {
      coins: parseInt(coins[message.author.id].coins) - parseInt(argument[1])
    }
  }

  //add money to the one who recieved coins
  if(coins[u.id]) {
    coins[u.id] = {
      coins: parseInt(coins[u.id].coins) + parseInt(argument[1])
    }
  }

  //send success message
  message.channel.send(`*${message.author.username}* gave *${u.username}*, **${argument[1]}** coins!`);

  }

  //save changes
  fs.writeFileSync(`${__dirname}/economy/coins.json`, JSON.stringify(coins), "utf-8");

  return;

}

}


if(eBet[0] == true) {
	
if(command == `${prefix}bet`) {
	
  if(debug == true) {
  	console.log(message.author.id + ': used the bet command');
      console.log('Bot response: ' + cli.ping + 'ms');
      console.log('Bot ID: ' + cli.user.id);
  }
	
  //if extra args return this
  if(argument[1]) return;
  
  //add coins to users if not stored
  if(!coins[message.author.id].coins) {
    coins[message.author.id] = {
      coins: 0
    }
    fs.writeFileSync(`${__dirname}/economy/coins.json`, JSON.stringify(coins), "utf-8");
  }
  
  if(!argument[0]) return message.reply("Must provide a value to bet!");
  
  if(parseInt(argument[0]) > coins[message.author.id].coins) return message.reply(`Cannot bet more coins than you currently have!\nCurrent balance is: **${coins[message.author.id].coins}**`);
  
  if(parseInt(argument[0]) <= 0) return message.reply("Cannot bet 0 or less coins!");
  
  let winC = Math.floor(Math.random() * 101) - 1;
  if(winC > eBet[1]) {
  //lose
    if(coins[message.author.id]) {
      coins[message.author.id] = {
        coins: parseInt(coins[message.author.id].coins) - parseInt(argument[0])
      }
    message.channel.send(`Sorry ${message.author} you lost your **${argument[0]}**, better luck next time!`);
    }
  } else {
  //win
    if(coins[message.author.id]) {
      coins[message.author.id] = {
        coins: parseInt(coins[message.author.id].coins) + parseInt(argument[0])
      }
    message.channel.send(`Congrats ${message.author} you won back your **${argument[0]}** and another **${argument[0]}**!`);
    }
  }
  
  fs.writeFileSync(`${__dirname}/economy/coins.json`, JSON.stringify(coins), "utf-8");
  
  return;
	
}

}

});

cli.login(token);