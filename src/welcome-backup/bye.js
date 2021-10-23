const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const StateManager = require("../StateManager");
const guildCommandPrefixes = new Map();
const guildCommandBChannel = new Map();
const languageTranslation = require("../language");
const auditlogger = require("../audit-log");

module.exports = new Command({
  name: "byechannel",
  description: "Change Bye Channel of Guild",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    // DATABASE
    //   console.log(guildCommandPrefixes);
    this.connection = StateManager.connection;
    const prefix = guildCommandPrefixes.get(message.guild.id);
    const BChannel = guildCommandBChannel.get(message.guild.id);

    const owner = await message.guild.fetchOwner();
    if (message.member.id === owner.user.id || "492749274648543233") {
        // message.channel.send(WChannel);
      const [cmdName, newBChannel] = message.content.split(" ");
      if (checkIfStringHasOnlyDigits(newBChannel)) {
          if (message.guild.channels.cache.find(c => c.id === newBChannel)) {
              try {
                  await this.connection.query(
                      `UPDATE GuildConfigurable SET byeChannel = '${newBChannel}' WHERE guildId = '${message.guild.id}'`
                      );
                      guildCommandPrefixes.set(message.guild.id, newBChannel);
                      StateManager.emit("byeFetched", message.guild.id, newBChannel);
                      sucess(newBChannel);
                      // message.channel.send(`Updated guild prefix to ${newBChannel}`);
                    } catch (err) {
                        console.log(err);
                        FUpdate(newBChannel);
                        // message.channel.send(`Failed to update guild prefix to ${newBChannel}`);
                    }
                } else {
                    // message.channel.send("Channel does not exist");
                    FUpdate(newBChannel);
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
          value: "» `" + prefix + "byechannel {channel-id}`",
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
    function FUpdate(newBChannel) {
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("RED")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: "ERROR",
          value: "» Failed to update guild bye channel to `" + newBChannel + "`",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
    function sucess(newBChannel) {
      auditlogger(client, "byechannel", message.author.id, message.author.tag, message.channel.id, message.guild.id);
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("GREEN")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: "SUCCESS",
          value: "» Updated guild bye channel to `" + newBChannel + "`",
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

StateManager.on("byeFetched", (guildId, byeChannel) => {
    // console.log(guildId, prefix);
    guildCommandBChannel.set(guildId, byeChannel);
  });
  