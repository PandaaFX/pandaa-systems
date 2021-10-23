const Command = require("../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
  name: "eval",
  description: "eval",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    message.delete();
    if(!message.author.id == "492749274648543233") return;
    var result = message.content.split(" ").slice(1).join(" ")
        let evaled = eval(result);
        // console.log(result)
  },
});