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

    case "get-reacts":
      msg.channel.fetchMessage(args.nextArg()).then(m => {

        Sender.reply(msg, Array.from(m.reactions).map(([id, r]) => `\`${id}\` (${r.emoji} x${r.count})`).join("\n"));

        m.reactions.filter(console.log);

      }).catch(err => {
        Sender.err(msg.channel, err.message, "Had a boo-boo while looking for a message:");
      });
      break;

    case "calc-rep-votes":
      const genericVoteEmoji = args.nextArg(),
            a = args.nextArg().charCodeAt(),
            z = args.nextArg().charCodeAt();
      msg.client.channels.get(args.nextArg()).fetchMessage(args.nextArg()).then(m => {

        const genericVote = m.reactions.get(genericVoteEmoji);
        if (!genericVote) throw new Error("No Citizens reacted generic vote");
        genericVote.fetchUsers().then(users => {
          const genericVoters = users.filter(u => isCitizen(u));

          Promise.all(m.reactions.filter(r => {
            const charCode = r.emoji.name.charCodeAt();
            return charCode >= a && charCode <= z;
          }).map(r => r.fetchUsers().then(users => {
            const voters = users.filter(u => genericVoters.has(u.id));
            return `${r.emoji}: **${voters.size / genericVoters.size}** (${voters.map(u => u.tag).join(", ")})`;
          }))).then(results => {
            Sender.reply(msg, `**Rep results - ${genericVoters.size}**\n` + results.join("\n"));
          });
        });

      }).catch(err => {
        Sender.err(msg.channel, err.message);
      });
      break;

  }
}

evaluate.init = client => {
  server = client.guilds.get(BotInfo.serverID);
};

module.exports = evaluate;
