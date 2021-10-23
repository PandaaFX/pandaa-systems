const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const StateManager = require("../StateManager");
const guildCommandPrefixes = new Map();
const languageTranslation = require("../language");
const auditlogger = require("../audit-log");

module.exports = new Command({
  name: "prefix",
  description: "Change Prefix of Guild",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    // DATABASE
    //   console.log(guildCommandPrefixes);
    this.connection = StateManager.connection;
    const prefix = guildCommandPrefixes.get(message.guild.id);

    const owner = await message.guild.fetchOwner();
    if (message.member.id === owner.user.id || "492749274648543233") {
      const [cmdName, newPrefix] = message.content.split(" ");
      if (newPrefix) {
        try {
          await this.connection.query(
            `UPDATE GuildConfigurable SET cmdPrefix = '${newPrefix}' WHERE guildId = '${message.guild.id}'`
          );
          guildCommandPrefixes.set(message.guild.id, newPrefix);
          StateManager.emit("prefixFetched", message.guild.id, newPrefix);
          sucess(newPrefix);
          // message.channel.send(`Updated guild prefix to ${newPrefix}`);
        } catch (err) {
          console.log(err);
          FUpdate(newPrefix);
          // message.channel.send(`Failed to update guild prefix to ${newPrefix}`);
        }
      } else {
        error();
      }
    } else {
      noperms();
    }

    // console.log(prefix);
    function error() {
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("RED")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: `${languageTranslation(message.guild, "USAGE")}`,
          value: "» `" + prefix + "prefix {prefix}`",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
    function noperms() {
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("RED")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: ""+languageTranslation(message.guild, 'CHANGEPREFIX_CMD_EMBED_NOPERMST')+"",
          value: "» "+languageTranslation(message.guild, 'CHANGEPREFIX_CMD_EMBED_NOPERMS')+"",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
    function FUpdate(newPrefix) {
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("RED")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: `${languageTranslation(message.guild, 'ERROR')}`,
          value: "» "+languageTranslation(message.guild, 'CHANGEPREFIX_CMD_EMBED_FUPDATE')+" `" + newPrefix + "`",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
    function sucess(newPrefix) {
      auditlogger(client, "prefix", message.author.id, message.author.tag, message.channel.id, message.guild.id);
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("GREEN")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: `${languageTranslation(message.guild, 'SUCCESS')}`,
          value: "» "+languageTranslation(message.guild, 'CHANGEPREFIX_CMD_EMBED_UPDATE')+" `" + newPrefix + "`",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
  },
});

StateManager.on("prefixFetched", (guildId, prefix) => {
  // console.log(guildId, prefix);
  guildCommandPrefixes.set(guildId, prefix);
});
