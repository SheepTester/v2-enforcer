const BotInfo = require("../botinfo.json");
const Args = require("./argument-separator.js");
const Sender = require("./fancy-sender.js");

const userMentionRegex = /<!?([0-9])+>/;

let server;

function parseUserMention(mention) {
  let exec = userMentionRegex.exec(mention);
  return exec && exec[0];
}

function isCitizen(user) {
  let guildMember = server.member(user);
  if (!guildMember) return false;
  return !!BotInfo.citizenRoles.find(r => guildMember.roles.has(r));
}

function evaluate(msg, fn) {
  let args = new Args(fn);
  switch (args.nextArg()) {
    case BotInfo.prefix:
      evaluate(msg, args.rest());
      break;
    case "say":
      Sender.reply(msg, "```\n" + args.rest() + "\n```");
      break;
    case "roles":
      if (msg.guild) {
        Sender.reply(msg, msg.guild.roles.map(r => `\`${r.id}\` ${r.name}`).join("\n"));
      } else {
        Sender.err(msg.channel, "I'm not in a guild!");
      }
      break;
  }
}

evaluate.init = client => {
  server = client.guilds.get(BotInfo.serverID);
};

module.exports = evaluate;
