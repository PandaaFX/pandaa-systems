const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const StateManager = require("../StateManager");
const guildCommandPrefixes = new Map();
const languageTranslation = require("../language");
const auditlogger = require("../audit-log");
const guildCommandWRole = new Map();
const guildCommandWChannel = new Map();
const guildCommandBChannel = new Map();

module.exports = new Command({
  name: "welcomeoptions",
  description: "Display current welcome settings",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    // DATABASE
    //   console.log(guildCommandPrefixes);
    this.connection = StateManager.connection;
    const prefix = guildCommandPrefixes.get(message.guild.id);
    const WRole = guildCommandWRole.get(message.guild.id);
    const WChannel = guildCommandWChannel.get(message.guild.id);
    const BChannel = guildCommandBChannel.get(message.guild.id);

    const owner = await message.guild.fetchOwner();
    if (message.member.id === owner.user.id || "492749274648543233") {
        // message.channel.send(WRole);
              try {
                      sucess(WChannel, BChannel, WRole);
                      // message.channel.send(`Updated guild prefix to ${newWRole}`);
                    } catch (err) {
                        console.log(err);
                        return;
                        // message.channel.send(`Failed to update guild prefix to ${newWRole}`);
                    }
    } else {
      return;
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
    function sucess(wchannel, bchannel, wrole) {
        let welcome = wchannel;
        let welcome2 = "» <#"+ wchannel + ">";
            if (welcome == "/") {
                welcome = "unset";
                welcome2 = " ";
            }
        let bye = bchannel;
        let bye2 = "» <#"+ bchannel + ">";
            if (bye == "/") {
                bye = "unset";
                bye2 = " ";
            }
        let wRole = wrole;
        let wRole2 = "» <@&"+ wrole + ">";
            if (wRole == "/") {
                wRole = "unset";
                wRole2 = " ";
            }
      auditlogger(client, "welcomeoptions", message.author.id, message.author.tag, message.channel.id, message.guild.id);
      const embed = new Discord.MessageEmbed();

      embed
        .setColor("GREEN")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields(
        {
          name: "Welcome channel:",
          value: "» `" + welcome + "`\n"+ welcome2 + "",
          inline: false,
        },
        {
            name: "Bye channel:",
            value: "» `" + bye + "`\n"+ bye2 + "",
            inline: false,
        },
        {
            name: "Welcome role:",
            value: "» `" + wRole + "`\n"+ wRole2 + "",
            inline: false,
          },
        );

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

  
StateManager.on("welcomeFetched", (guildId, welcomeChannel) => {
    // console.log(guildId, prefix);
    guildCommandWChannel.set(guildId, welcomeChannel);
  });

  StateManager.on("byeFetched", (guildId, byeChannel) => {
    // console.log(guildId, prefix);
    guildCommandBChannel.set(guildId, byeChannel);
  });
  