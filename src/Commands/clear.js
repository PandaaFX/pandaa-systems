const Discord = require("discord.js");
const languageTranslation = require("../language");

const Command = require("../Structures/Command.js");
const StateManager = require("../StateManager");
const guildCommandPrefixes = new Map();
const auditlogger = require("../audit-log");

module.exports = new Command({
  name: "clear",
  description: "Clear an amount of messages",
  permission: "MANAGE_MESSAGES",
  aliases: ["cc"],
  async run(message, args, client) {
    message.delete();
    setTimeout(function () {
      const prefix = guildCommandPrefixes.get(message.guild.id);

      const amount = args[1];

      if (!amount || isNaN(amount)) {
        error(
          `${languageTranslation(message.guild, "USAGE")}`,
          "» `" + prefix + "clear {1-100}`"
        );
        return;
      }

      const amountParsed = parseInt(amount);

      if (amountParsed > 100) {
        error(`${languageTranslation(message.guild, "ERROR")}`, `${languageTranslation(message.guild, "CLEAR_CMD_EMBED_TO_MANY_MESSAGES")}`);
        return;
      }

      message.channel.bulkDelete(amountParsed);

      const embeds = new Discord.MessageEmbed();

      embeds
        .setColor("GREEN")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: `${languageTranslation(message.guild, "SUCCESS")}`,
          value: "» `" + amountParsed + "` " + languageTranslation(message.guild, "CLEAR_CMD_EMBED_CLEARED") + "",
          inline: false,
        });

      message.channel.send({ embeds: [embeds] }).then((msg) => {
        setTimeout(() => msg.delete(), 3000);
        auditlogger(client, "clear", message.author.id, message.author.tag, message.channel.id, message.guild.id);
      });
      // const msg = await message.channel.send(`Cleared ${amountParsed} messages!`);

      // setTimeout(() => msg.delete(), 4000);

      function error(errT, err) {
        const embed = new Discord.MessageEmbed();

        embed
          .setColor("RED")
          .setFooter(message.author.tag)
          .setTimestamp()
          .addFields({
            name: " " + errT + " ",
            value: " " + err + " ",
            inline: false,
          });

        message.channel.send({ embeds: [embed] }).then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });
      }
    }, 100);
  },
});

StateManager.on("prefixFetched", (guildId, prefix) => {
  // console.log(guildId, prefix);
  guildCommandPrefixes.set(guildId, prefix);
});
