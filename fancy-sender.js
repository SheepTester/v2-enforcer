const BotInfo = require("./botinfo.json");

function makeEmbed(colour, title, content) {
  return {
    color: parseInt(colour, 16),
    title: title,
    description: content,
    timestamp: new Date(),
    footer: {
      text: BotInfo.footerText
    }
  };
}

module.exports = {
  send(channel, title, content) {
    channel.send({
      embed: makeEmbed(BotInfo.colour, title, content)
    }).catch(err => {
      channel.send({
        embed: makeEmbed(BotInfo.errorColour, "There was a problem:", "```\n" + err.message + "\n```")
      });
    });
  },
  reply(origMsg, content) {
    origMsg.channel.send({
      embed: makeEmbed(BotInfo.colour, "to @" + origMsg.author.tag + ":", content, origMsg.client)
    }).catch(err => {
      origMsg.channel.send({
        embed: makeEmbed(BotInfo.errorColour, "There was a problem:", "```\n" + err.message + "\n```")
      });
    });
  }
};
