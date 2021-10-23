const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const StateManager = require("../StateManager");
const guildCommandPrefixes = new Map();
const languageTranslation = require("../language");
const auditlogger = require("../audit-log");
const guildCommandWRole = new Map();

module.exports = new Command({
  name: "welcomerole",
  description: "Change Welcome Role of Guild",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    // DATABASE
    //   console.log(guildCommandPrefixes);
    this.connection = StateManager.connection;
    const prefix = guildCommandPrefixes.get(message.guild.id);
    const WRole = guildCommandWRole.get(message.guild.id);

    const owner = await message.guild.fetchOwner();
    if (message.member.id === owner.user.id || "492749274648543233") {
        // message.channel.send(WRole);
      const [cmdName, newWRole] = message.content.split(" ");
      if (checkIfStringHasOnlyDigits(newWRole)) {
          if (message.guild.roles.cache.get(newWRole)) {
              try {
                  await this.connection.query(
                      `UPDATE GuildConfigurable SET welcomeRole = '${newWRole}' WHERE guildId = '${message.guild.id}'`
                      );
                      guildCommandPrefixes.set(message.guild.id, newWRole);
                      StateManager.emit("welcomeRoleFetched", message.guild.id, newWRole);
                      sucess(newWRole);
                      // message.channel.send(`Updated guild prefix to ${newWRole}`);
                    } catch (err) {
                        console.log(err);
                        FUpdate(newWRole);
                        // message.channel.send(`Failed to update guild prefix to ${newWRole}`);
                    }
                } else {
                    // message.channel.send("Channel does not exist");
                    FUpdate(newWRole);
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
          value: "» `" + prefix + "welcomerole {role-id}`",
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
    function FUpdate(newWRole) {
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("RED")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: "ERROR",
          value: "» Failed to update guild welcome role to `" + newWRole + "`",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
    function sucess(newWRole) {
      auditlogger(client, "welcomerole", message.author.id, message.author.tag, message.channel.id, message.guild.id);
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("GREEN")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: "SUCCESS",
          value: "» Updated guild welcome role to `" + newWRole + "`",
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

StateManager.on("welcomeRoleFetched", (guildId, welcomeChannel) => {
    // console.log(guildId, prefix);
    guildCommandWRole.set(guildId, welcomeChannel);
  });
  