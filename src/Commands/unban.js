const Discord = require("discord.js");
const languageTranslation = require("../language");
const auditlogger = require("../audit-log");

const Command = require("../Structures/Command.js");
const StateManager = require("../StateManager");
const guildCommandPrefixes = new Map();
module.exports = new Command({
  name: "unban",
  description: "unban a user",
  permission: "BAN_MEMBERS",
  async run(message, args, client) {
    //   var test = args[1];
    // message.guild.bans.fetch(test)
    // .then(todo(test))
    // .catch(console.error);
    const prefix = guildCommandPrefixes.get(message.guild.id);

    const guildmemberID = args[1];
    const user = getUserFromMention(args[1], guildmemberID);
    function check(id) {
      try {
        // const banList = message.guild.fetchBans();
        // const targetId = banList.find(user => user.id === id);
        message.guild.bans
          .fetch(id)
          .then((bansUser) => {
            // Code when the user is banned
            todo(id);
          })
          .catch((error) => {
            notbanned(id);
          });
        // console.log(targetId);
      } catch (err) {
        // await message.channel.send('This user is not banned')
        // console.log(err);
        console.log("ERROR\n" + err);
      }
    }

    function error() {
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("RED")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: `${languageTranslation(message.guild, "USAGE")}`,
          value: "» `" + prefix + "unban {user}`",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }

    function sucess(user) {
      auditlogger(client, "unban", message.author.id, message.author.tag, message.channel.id, message.guild.id);
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("GREEN")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: `${languageTranslation(
            message.guild,
            "UNBAN_CMD_EMBED_UNBANNEDT"
          )}`,
          value:
            "» `USER: " +
            user +
            " " +
            languageTranslation(message.guild, "UNBAN_CMD_EMBED_UNBANNED") +
            "`",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }

    function notbanned(user) {
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("RED")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: `${languageTranslation(
            message.guild,
            "UNBAN_CMD_EMBED_ISNOTBANNEDT"
          )}`,
          value:
            "» `USER: " +
            user +
            " " +
            languageTranslation(message.guild, "UNBAN_CMD_EMBED_ISNOTBANNED") +
            "`",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
    // message.reply("Working!");
    // const user = getUserFromMention(args[0]);
    // console.log(user);
    // // message.reply("Working!");

    function getUserFromMention(mention, memberNAME) {
      if (!mention) return;

      if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);

        if (mention.startsWith("!")) {
          mention = mention.slice(1);
        }

        if (!mention) return error();
        return check(mention);
      } else {
        return check(memberNAME);
      }
    }
    if (args.length < 2) {
      return error();
    }

    // const memberNAME = args[1];
    // const user = getUserFromMention(args[1], memberNAME);
    function todo(userr) {
      // const banList = message.guild.fetchBans();
      // const bannedUser = banList.get(userr).user
      // console.log(bannedUser);
      // if (bannedUser) {

      // message.guild.members.unban(userr);
      message.guild.bans
        .remove(userr)
        .then((user) => sucess(user))
        .catch(console.error);
      // sucess(userr);
    }
    // else {
    //     notbanned(userr);
    //     }
    // }
  },
});
StateManager.on("prefixFetched", (guildId, prefix) => {
  // console.log(guildId, prefix);
  guildCommandPrefixes.set(guildId, prefix);
});
