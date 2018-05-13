const Discord = require("discord.js");
const client = new Discord.Client();

const Token = require("./token.json");
const BotInfo = require("./botinfo.json");

const Evaluate = require("./evaluator.js");

client.on("ready", () => {
  console.log("I'm in.");
});

client.on("message", msg => {
  if (msg.author.id === client.user.id) return;
  if (msg.channel.type === "dm") Evaluate(msg, msg.content);
  else if (msg.guild && msg.guild.id === BotInfo.serverID
      && msg.content.toLowerCase().slice(0, BotInfo.prefix.length + 1) === BotInfo.prefix + " ")
    Evaluate(msg, msg.content.slice(BotInfo.prefix.length + 1));
});

client.on("error", err => {
  client.destroy().then(() => client.login(Token.token));
});

process.on('unhandledRejection', (reason, p) => {
  reason = reason.message;
  if (reason.length > 100) console.log("UNHAPPY REJECT PROBLEM:\n" + reason.slice(0, 49) + "..." + reason.slice(-49));
  else console.log("UNHAPPY REJECT PROBLEM:\n" + reason);
});

client.login(Token.token);
