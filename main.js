const Discord = require("discord.js");
const client = new Discord.Client();

const Token = require("./token.json");
const BotInfo = require("./botinfo.json");

const Evaluate = require("./helpers/evaluator.js");

let server;

client.on("ready", () => {
  console.log("I'm in.");
  server = client.guilds.get(BotInfo.serverID);
  client.user.setActivity("THE DEMOCRACY.", {type: "WATCHING"});
  Evaluate.init(client);
  /*client.guilds.get(BotInfo.serverID).channels.map(c => {
    if (c.type === "text") {
      c.fetchMessages({limit: 30}).then(msgs => msgs.map(m => ~BotInfo.badpeople.indexOf(m.author.id) && m.delete()))
    }
  });*/
  // client.channels.get("432645237819572254").fetchMessages({limit: 100}).then(msgs => msgs.map(m => ~BotInfo.badpeople.indexOf(m.author.id) && m.delete()));
  /*client.fetchUser("418827664304898048").then(u => {
    client.guilds.get(BotInfo.serverID).member(u).ban();
  });*/
  /*client.fetchUser("212355530474127361").then(u => {
    client.channels.get("429091816516747304").overwritePermissions(u, {
      MANAGE_ROLES: true
    });
  });*/
  /*client.channels.get('431309389740244992').fetchMessages({limit: 10}).then(msgs => {
    msgs.map(m => m.author.id === "418667403396775936" && m.delete());
  });*/
});

client.on("message", msg => {
  if (msg.author.id === client.user.id) return;
  if (~BotInfo.badpeople.indexOf(msg.author.id)) {
    let mem = server.member(msg.author);
    if (!mem.roles.has("430447316042907658")) mem.addRole("430447316042907658");
    // if (~msg.content.indexOf("image.jpg") || msg.attachments.size > 0) {
      msg.delete();
      return;
    // }
  }
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
