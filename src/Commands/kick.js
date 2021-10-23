const Discord = require("discord.js");
const languageTranslation = require("../language");
const auditlogger = require("../audit-log");

const Command = require("../Structures/Command.js");
const StateManager = require("../StateManager");
const guildCommandPrefixes = new Map();
module.exports = new Command({
  name: "kick",
  description: "Kick a user",
  permission: "KICK_MEMBERS",
  async run(message, args, client) {
    if (message.author.id == message.mentions.members.first().id) {
      const embed = new Discord.MessageEmbed();
    
      embed
      .setColor("RED")
      .setFooter(message.author.tag)
      .setTimestamp()
      .addFields(
          {
              name: `${languageTranslation(message.guild, 'ERROR')}`,
              value: "» "+ languageTranslation(message.guild, 'KICK_CMD_EMBED_CANT_KICK_SELF') + "",
              inline: false,
            }
            );
            
            message.reply({ embeds: [embed] });
      return
    }

    const userr = message.mentions.users.first();
    const userMember = await message.guild.members.fetch(userr);
    if (userMember.permissions.has('ADMINISTRATOR') || userMember.permissions.has('MANAGE_MESSAGES')) {
      const embed = new Discord.MessageEmbed();
      
      embed
      .setColor("RED")
      .setFooter(message.author.tag)
      .setTimestamp()
      .addFields(
          {
              name: `${languageTranslation(message.guild, 'ERROR')}`,
              value: "» "+ languageTranslation(message.guild, 'KICK_CMD_EMBED_CANT_KICK_MODERATOR') + "",
              inline: false,
            }
            );
            
            message.reply({ embeds: [embed] });
      return
    }
    // message.reply("Working!");
    // const user = getUserFromMention(args[0]);
    // console.log(user);
    // // message.reply("Working!");
    // console.log("COMMAND REGISTERD");
    const prefix = guildCommandPrefixes.get(message.guild.id);

    // const user = getUserFromMention(args[1]);
    // console.log(user);
    const guildmemberID = args[1]
    const user = getUserFromMention(args[1], guildmemberID);
    function check(id, reason) {
      try {
        // const banList = message.guild.bans.fetch();
        // const targetId = banList.get(id).user

        // message.guild.members.fetch(id)
        // .then((data) => console.log(data));

        // const targetId = message.guild.members.cache.find(id);
        let targetId = message.guild.members.fetch(id);
        // console.log(targetId);
        if (targetId) {
          // await message.guild.members.unban(targetId);
          // await message.channel.send('This user has been unbanned!');
          // console.log("USER ON SERVER");
          todo(id, reason);
        } else {
          console.log("USER IS NOT ON SERVER");
        }
      } catch (err) {
        // message.channel.send('This user is not on the Server')
        // notbanned(id);
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
          value: "» `" + prefix + "kick {user} {reason}`",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
    function getUserFromMention(mention, memberNAME) {
      if (!mention) return;
      const reason = args.slice(2).join(" ");
        
        if (mention.startsWith("<@") && mention.endsWith(">")) {
            mention = mention.slice(2, -1);
            
            if (mention.startsWith("!")) {
                mention = mention.slice(1);
            }
            
            return check(mention, reason);
        } else {
            return check(memberNAME, reason);
        }
    }
    function sucess(user, reason) {
      auditlogger(client, "kick", message.author.id, message.author.tag, message.channel.id, message.guild.id);
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("GREEN")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: "KICKED",
          value:
            "» `USER: " +
            user +
            " " +
            languageTranslation(message.guild, "KICK_CMD_EMBED_KICKED") +
            " " +
            reason +
            "`",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
    if (args.length < 2) {
      return error();
    }

    // const user = getUserFromMention(args[1]);
    // if (!user) {
    //   return message.reply(
    //     "Bitte verwenden Sie eine angemessene Erwähnung, wenn Sie jemanden Kicken wollen."
    //   );
    // }

    // return message.channel.send(
    //   `**${user.tag}** wurde erfolgreich vom Server gekickt!`
    // );
    function todo(userr, reason) {
      // const banList = message.guild.fetchBans();
      // const bannedUser = banList.get(userr).user
      // console.log(bannedUser);
      // if (bannedUser) {

      // message.guild.members.unban(userr);
      // message.guild.bans.remove(userr)
      // .then(user => sucess(user))
      // .catch(console.error);
      // const reason = args.slice(2).join(" ");
      if (!reason) {

        reason = "Undefined";
      }
      try {
        message.guild.members.kick(userr, { reason });
        sucess(userr, reason);
      } catch (error) {
        return message.channel.send(`${error}`);
      }
      // sucess(userr);
    }
  },
});
StateManager.on("prefixFetched", (guildId, prefix) => {
  // console.log(guildId, prefix);
  guildCommandPrefixes.set(guildId, prefix);
});
