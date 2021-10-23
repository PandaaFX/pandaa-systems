const Discord = require("discord.js");
const languageTranslation = require('../language');
const auditlogger = require("../audit-log");

const Command = require("../Structures/Command.js");
const StateManager = require('../StateManager');
const guildCommandPrefixes = new Map();
module.exports = new Command({
  name: "ban",
  description: "Ban a user",
  permission: "BAN_MEMBERS",
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
              value: "» "+ languageTranslation(message.guild, 'BAN_CMD_EMBED_CANT_BAN_SELF') + "",
              inline: false,
            }
            );
            
            message.reply({ embeds: [embed] });
      return
    let mentionU = message.mentions.users.first();
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
              value: "» "+ languageTranslation(message.guild, 'BAN_CMD_EMBED_CANT_BAN_MODERATOR') + "",
              inline: false,
            }
            );
            
            message.reply({ embeds: [embed] });
      return
    }
    // message.reply("Working!");
    // const user = getUserFromMention(args[1]);
    // console.log(user);
    // message.reply("Working!");
    const prefix = guildCommandPrefixes.get(message.guild.id);
    function error() {
      const embed = new Discord.MessageEmbed();
      
      embed
      .setColor("RED")
      .setFooter(message.author.tag)
      .setTimestamp()
      .addFields(
          {
              name: `${languageTranslation(message.guild, 'USAGE')}`,
              value: "» `" + prefix + "ban {user} {reason}`",
              inline: false,
            }
            );
            
            message.reply({ embeds: [embed] });
        }
        function sucess(user, reason) {
          auditlogger(client, "ban", message.author.id, message.author.tag, message.channel.id, message.guild.id);
          const embed = new Discord.MessageEmbed();
          
          embed
          .setColor("GREEN")
          .setFooter(message.author.tag)
          .setTimestamp()
          .addFields(
              {
                  name: `${languageTranslation(message.guild, 'BAN_CMD_EMBED_BANNEDT')}`,
                  value: "» `USER: " + user + " " + languageTranslation(message.guild, 'BAN_CMD_EMBED_BANNED') + " " + reason + "`",
                  inline: false,
                }
                );
                
                message.reply({ embeds: [embed] });
            }
            function getUserFromMention(mention, memberNAME) {
              const reason = args.slice(2).join(" ");
                if (!mention) return;
                
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
    if (args.length < 2) {
      return error();
    }

    const guildmemberID = args[1]
    const user = getUserFromMention(args[1], guildmemberID);
    function check(id, reason) {

        try {
            const banList = message.guild.bans.fetch();
            const targetId = banList.get(id).user
            
            if(targetId) {
                // await message.guild.members.unban(targetId);
                // await message.channel.send('This user has been unbanned!');
                isbanned(id, reason);
              }
            } catch (err) {
              // await message.channel.send('This user is not banned')
              todo(id, reason);
            //    console.log("ERROR\n" + err);
        }
    }

    function isbanned(user) {
      const embed = new Discord.MessageEmbed();
      
      embed
      .setColor("RED")
      .setFooter(message.author.username)
      .setTimestamp()
      .addFields(
          {
              name: `${languageTranslation(message.guild, 'BAN_CMD_EMBED_ISBANNEDT')}`,
              value: "» `USER: " + user + " " + languageTranslation(message.guild, 'BAN_CMD_EMBED_ISBANNED') + "`",
              inline: false,
              }
              );
              
              message.reply({ embeds: [embed] });
          }
    
    
    function todo(user, reason) {
      if (!user) {
        return error();
      }
      if (!reason) {
        // return error();
        var reason = "Undefined";
      }

      try {
        message.guild.members.ban(user, { reason });

      } catch (error) {
          return message.channel.send(
              `${error}`
              );
          return;
          }
          
          return sucess(user, reason);
          }
  },
});

StateManager.on('prefixFetched', (guildId, prefix) => {
  // console.log(guildId, prefix);
  guildCommandPrefixes.set(guildId, prefix);
})
