const BotInfo = require("./botinfo.json");
const Args = require("./argument-separator.js");
const Sender = require("./fancy-sender.js");

function evaluate(msg, fn) {
  let args = new Args(fn);
  switch (args.nextArg()) {
    case BotInfo.prefix:
      evaluate(msg, args);
      break;
    case "say":
      Sender.reply(msg, args.rest());
      break;
  }
}

module.exports = evaluate;
