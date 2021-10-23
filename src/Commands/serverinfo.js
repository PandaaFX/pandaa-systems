const Command = require("../Structures/Command.js");
const languageTranslation = require("../language");
const auditlogger = require("../audit-log");

const Discord = require("discord.js");

module.exports = new Command({
  name: "serverinfo",
  description: "Discord Member count",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    // const embed = new Discord.MessageEmbed();
    // const memberCount = message.guild.memberCount;

    // embed
    //     .setTitle("Member • Information")
    //     // .setURL("https://newhistory.cc/")
    //     .setDescription(" `Current User: " + memberCount + "` ")
    //     .setColor("BLURPLE")
    //     // .setThumbnail("https://darkbluepandaa.de/img/fix_3.gif")
    //     .setFooter(message.author.tag)
    //     .setTimestamp()
    //     // .setImage("https://newhistory.cc/img/testus.png")

    // message.reply({ embeds: [embed] });
    const guild = message.guild;

    const owner = await message.guild.fetchOwner();
    let guildDescription = guild.description;
    if (!guildDescription) {
      guildDescription = "None";
    }
    auditlogger(client, "serverinfo", message.author.id, message.author.tag, message.channel.id, message.guild.id);
    const embed = new Discord.MessageEmbed();
    embed.setTitle("Server • Information").addFields(
      {
        name: "Name",
        value: "» `" + guild.name + "`",
        inline: true,
      },
      {
        name: "ID",
        value: "» `" + guild.id + "`",
        inline: true,
      },
      {
        name: `${languageTranslation(
          message.guild,
          "SERVERINFO_CMD_EMBED_DESCRIPTION"
        )}`,
        value: "» `" + guildDescription + "`",
        inline: true,
      },
      {
        name: `${languageTranslation(
          message.guild,
          "SERVERINFO_CMD_EMBED_CREATEDAT"
        )}`,
        value: "» `" + guild.createdAt.toDateString() + "`",
        inline: true,
      },
      {
        name: `${languageTranslation(
          message.guild,
          "SERVERINFO_CMD_EMBED_OWNER"
        )}`,
        value: "» `" + owner.user.tag + "`",
        inline: true,
      },

      {
        name: `${languageTranslation(
          message.guild,
          "SERVERINFO_CMD_EMBED_MEMBERCOUNT"
        )}`,
        value: "» `" + guild.memberCount.toString() + "`",
        inline: true,
      },
      {
        name: `${languageTranslation(
          message.guild,
          "SERVERINFO_CMD_EMBED_MEMBERCAP"
        )}`,
        value: "» `" + guild.maximumMembers.toString() + "`",
        inline: true,
      },
      {
        name: "Boosts",
        value: "» `" + guild.premiumSubscriptionCount.toString() + "`",
        inline: true,
      },
      {
        name: "Boost Level",
        value: "» `" + guild.premiumTier + "`",
        inline: true,
      }
    );

    message.reply({ embeds: [embed] });
  },
});
