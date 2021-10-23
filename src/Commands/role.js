/** @format */
const Discord = require("discord.js");
const auditlogger = require("../audit-log");
const languageTranslation = require("../language");

const Command = require("../Structures/Command.js");
const StateManager = require("../StateManager");
const guildCommandPrefixes = new Map();
module.exports = new Command({
  name: "role",
  description: "set Role of User",
  permission: "MANAGE_ROLES",
  async run(message, args, client) {
    const checkRole = getRoleFromMention(args[2]);
    if(!checkRole.editable) return noperms();
    // if(!message.member.guild.me.permissions.has(['MANAGE_ROLES'])) return message.channel.send('I don\'t have the permissions to make webhooks, please contact an admin or change my permissions!');
    // message.reply("Working!");
    // const user = getUserFromMention(args[0]);
    // console.log(user);
    // // message.reply("Working!");
    function noperms() {
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("RED")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields({
          name: "NO PERMS",
          value: "`I don\'t have the permissions to use this command,\nplease contact an admin or change my permissions!`",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
    const prefix = guildCommandPrefixes.get(message.guild.id);

    function error() {
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("RED")
        .setFooter(message.author.username)
        .setTimestamp()
        .addFields({
          name: `${languageTranslation(message.guild, "USAGE")}`,
          value: "» `" + prefix + "role {user} {role}`",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
    function success(user, rolle) {
      auditlogger(client, "role", message.author.id, message.author.tag, message.channel.id, message.guild.id);
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("GREEN")
        .setFooter(message.author.username)
        .setTimestamp()
        .addFields({
          name: `${languageTranslation(message.guild, "SUCCESS")}`,
          value: "» <@" + user + "> was added to the role <@&" + rolle + ">",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
    function hasrolee(user, rolle) {
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("GREEN")
        .setFooter(message.author.username)
        .setTimestamp()
        .addFields({
          name: `${languageTranslation(message.guild, "ERROR")}`,
          value:
            "» <@" +
            user +
            "> " +
            languageTranslation(
              message.guild,
              "ROLE_CMD_EMBED_HAS_ALREADY_ROLE"
            ) +
            " <@&" +
            rolle +
            ">",
          inline: false,
        });

      message.reply({ embeds: [embed] });
    }
    function getUserFromMention(mention) {
      if (!mention) return;

      if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);

        if (mention.startsWith("!")) {
          mention = mention.slice(1);
        }

        console.log(client.users.cache.get(mention));
        return client.users.cache.get(mention);
      }
    }

    function getRoleFromMention(mention2) {
      if (!mention2) return;

      if (mention2.startsWith("<@&") && mention2.endsWith(">")) {
        mention2 = mention2.slice(3, -1);

        if (mention2.startsWith("!")) {
          mention2 = mention2.slice(1);
        }
        // console.log(mention2);
        return (ROLLE = mention2);
      }
    }
    try {
      const member = message.mentions.members.first();
      if (!member) {
        return error();
      }
      const olle = getRoleFromMention(args[2]);
      if (!olle) {
        return error();
      }
      // console.log(olle);
      let hasrole = member.roles.cache.has(olle);
      if (!hasrole) {
        // message.channel.send("ADDED ROLE");
        let rolleV = message.guild.roles.cache.find((r) => r.id === olle);
        member.roles.add(rolleV).catch(console.error);
        success(member, olle);
      } else {
        hasrolee(member, olle);
        // message.channel.send("HAS ROLE");
      }
    } catch (error) {
      return message.channel.send(`${error}`);
    }
  },
});
StateManager.on("prefixFetched", (guildId, prefix) => {
  // console.log(guildId, prefix);
  guildCommandPrefixes.set(guildId, prefix);
});
