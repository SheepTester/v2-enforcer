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
      this.err(channel, "Sending a message didn't go as planned:");
    });
  },

  reply(origMsg, content) {
    origMsg.channel.send({
      embed: makeEmbed(BotInfo.colour, "to @" + origMsg.author.tag + ":", content, origMsg.client)
    }).catch(err => {
      this.err(origMsg.channel, err.message, "Replying didn't go as planned:");
    });
  },

  err(channel, content, title) {
    channel.send({
      embed: makeEmbed(BotInfo.errorColour, title || "There was a problem:", "```\n" + content + "\n```")
    });
  }

};
