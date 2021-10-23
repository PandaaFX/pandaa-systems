const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const StateManager = require("../StateManager");
const guildCommandPrefixes = new Map();
const guildCommandWChannel = new Map();
const languageTranslation = require("../language");
const auditlogger = require("../audit-log");

module.exports = new Command({
  name: "welcomechannel",
  description: "Change Welcome Channel of Guild",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    // DATABASE
    //   console.log(guildCommandPrefixes);
    this.connection = StateManager.connection;
    const prefix = guildCommandPrefixes.get(message.guild.id);
    const WChannel = guildCommandWChannel.get(message.guild.id);

    const owner = await message.guild.fetchOwner();
    if (message.member.id === owner.user.id || "492749274648543233") {
        // message.channel.send(WChannel);
      const [cmdName, newWChannel] = message.content.split(" ");
      if (checkIfStringHasOnlyDigits(newWChannel)) {
          if (message.guild.channels.cache.find(c => c.id === newWChannel)) {
              try {
                  await this.connection.query(
                      `UPDATE GuildConfigurable SET welcomeChannel = '${newWChannel}' WHERE guildId = '${message.guild.id}'`
                      );
                      guildCommandPrefixes.set(message.guild.id, newWChannel);
                      StateManager.emit("welcomeFetched", message.guild.id, newWChannel);
                      sucess(newWChannel);
                      // message.channel.send(`Updated guild prefix to ${newWChannel}`);
                    } catch (err) {
                        console.log(err);
                        FUpdate(newWChannel);
                        // message.channel.send(`Failed to update guild prefix to ${newWChannel}`);
                    }
                } else {
                    // message.channel.send("Channel does not exist");
                    FUpdate(newWChannel);

                    return;
                }
      } else {
        error();
      }
    } else {
      noperms();
    }
    function checkIfStringHasOnlyDigits(_string)
    {
        if(_string.match(/^[0-9]+$/) != null)
        {
            return true;
        }
        else
        {
            return false;
        }
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
          value: "» `" + prefix + "welcomechannel {channel-id}`",
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
          name: "NO PERMS",
          value: "» You do not have permission to use that command",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
    function FUpdate(newWChannel) {
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("RED")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: "ERROR",
          value: "» Failed to update guild welcome channel to `" + newWChannel + "`",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
    function sucess(newWChannel) {
      auditlogger(client, "welcomechannel", message.author.id, message.author.tag, message.channel.id, message.guild.id);
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("GREEN")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: "SUCCESS",
          value: "» Updated guild welcome channel to `" + newWChannel + "`",
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

StateManager.on("welcomeFetched", (guildId, welcomeChannel) => {
    // console.log(guildId, prefix);
    guildCommandWChannel.set(guildId, welcomeChannel);
  });
  