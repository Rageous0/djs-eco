### DO NOT USE!
**This README.md is faulty, the source is bad, please do not use it ever!**


## djs-eco



**Introduction**

djs-eco is an external library built upon the [Discord.js](https://www.npmjs.com/package/discord.js) library for discord bots.

This library is used for economics with discord.js, easily embedded into your bot.

Just setup a client and you are ready to run your bot!

This stores coins globally, so yes you would have same coins accross every server.

Feel free to contribute with your ideas.



**Example:**

```js
const djs-eco = require("djs-eco");
new djs-eco.settings(ePay: true, eBal: true, eBet: [true, 50], chanc, debug: true;
/*
This will generate a client with all stock commands enabled.
eBet will have a 50% chance of winning or loosing, when betting coins.
chance is for chance of spawn rate of coins and it is set to 25% in this case.
NOTE: chance cannot exceed 50 and you may not use 50 in a big popular discord as it can be annoying.
Debug is used for debugging information that will be logged in your console.
It will be something like this:
"27354689920462782: used coins commands
Bot response: 83ms
Bot ID: 289373827582949"
for use of commands.
For coins earning it will not be debugged AKA not logged, may be added in a future feature update.
*/
```



**Properties:**

*Yes all of data of these are required to run your client, and they need to be properly filled.*

- prefix (string)

The prefix you want the client to respond to.

You will not earn any coins if the messages contents starts with the prefix.

Recommended to use a short prefix so it is easier to remember.


- token (string)

You need to get a token to login your client with, otherwise you cannot run a bot.

Yes you can selfbot, but that would possibly lead to a ban of Discord, and I am NOT responsible for you trying this.

Must be valid as I said else you'll get an error saying incorrect login details.

Be sure to get token from bots page and not use client ID or client secret.


- settings (constructor)

The settings constructor is were all settings should be entered.

And yes all settings are required so if you want to disabld commands set them to false.

Be sure to use the types properly, otherwise you will get a throw error.

This will include all commands, chance for betting and coins earning and it will NOT include debugging, prefix or token.

See the example above!


  - ePay (boolean)
  
  This will enable (true) or disable (false) the pay command.
  
  The pay command is used to pay someone, you may not exceed the amount of coins you got.
  
  Recommended to have this set to true.
  
  
  - eBal (boolean)
  
  This will enable (true) or disable (false) the coins command.
  
  The coins command is used to check yours and others by balances (through an @mention).
  
  Recommended to have this set to true.
  
  
  - eBet (array) <0 = boolean> <1 = number>
  
  The first item will enable (true) or disable (false) the bet command.
  
  And the second item will set chance the chance to win (must be between 0-100).
  
  The bet command is to bet an amount of coins, and you may win your coins back + the same amount of coins again.
  
  Setting this to 0 is a bad idea, and will possibly removed in the future and get a real minimum limit.
  
  I do not recommend or recommend this command, since it is up to you if you want people to be able to gamble.
  
  If set to true you may set winning chance to 50 for the most fair but if you want it to be difficult you may lower winning chance.
  
  
  - chance (number)
  
  The chance of spawn rate for coins.
  
  It must be a valid between 1-50.
  
  You may keep it lower than 50 as 50 is a 50/50 chance of getting coins and it may be annoying.
  
  
- debug (boolean)

Will log some data when a user uses a command.

Like user ID, bot ID, ping and what command used.

This may be good for development purposes or debugging issues.
  
  
  
**Ideas?**

You got ideas for djs-eco please send me a message over at Discord!

My discord name+discriminator is: RageousGD#0666.



**External Note**

This README.md is not originally for this github repo.
The original documentation comes from the npm page of the package located at:
[djs-eco](https://www.npmjs.com/package/djs-eco)
