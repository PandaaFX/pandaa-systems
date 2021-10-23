const Discord = require("discord.js");
const languageTranslation = require("../language");

const Command = require("../Structures/Command.js");
const StateManager = require("../StateManager");
const guildCommandPrefixes = new Map();
const auditlogger = require("../audit-log");

module.exports = new Command({
  name: "status",
  description: "Status",
  permission: "MANAGE_MESSAGES",
  async run(message, args, client) {
    
  },
});

StateManager.on("prefixFetched", (guildId, prefix) => {
  // console.log(guildId, prefix);
  guildCommandPrefixes.set(guildId, prefix);
});
