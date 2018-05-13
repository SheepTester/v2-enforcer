const BotInfo = require("../botinfo.json");

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
      this.err(channel, err.message);
    });
  },
  reply(origMsg, content) {
    origMsg.channel.send({
      embed: makeEmbed(BotInfo.colour, "to @" + origMsg.author.tag + ":", content, origMsg.client)
    }).catch(err => {
      this.err(origMsg.channel, err.message);
    });
  },
  err(channel, content) {
    channel.send({
      embed: makeEmbed(BotInfo.errorColour, "There was a problem:", "```\n" + content + "\n```")
    });
  }
};
