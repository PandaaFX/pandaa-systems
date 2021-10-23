const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const StateManager = require("../StateManager");
const guildCommandPrefixes = new Map();
const languageTranslation = require("../language");
const auditlogger = require("../audit-log");
const guildCommandWRole = new Map();
const guildCommandWRole2 = new Map();
const guildCommandWRole3 = new Map();
const guildCommandWChannel = new Map();
const guildCommandBChannel = new Map();

module.exports = new Command({
  name: "welcome",
  description: "welcome [channel1 channel2 role settings help]",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    // if(message.author.id != "492749274648543233") return;
        // console.log(args[1]);
    this.connection = StateManager.connection;
    const prefix = guildCommandPrefixes.get(message.guild.id);
    const WRole = guildCommandWRole.get(message.guild.id);
    const WRole2 = guildCommandWRole2.get(message.guild.id);
    const WRole3 = guildCommandWRole3.get(message.guild.id);
    const WChannel = guildCommandWChannel.get(message.guild.id);
    const BChannel = guildCommandBChannel.get(message.guild.id);
    const owner = await message.guild.fetchOwner();
    let method;
    let fupdatemethod;
    if(!args[1]) return;
    if (message.member.id === owner.user.id || "492749274648543233") {
        if(args[1].toLowerCase() == 'channel1') {
            method = "welcomechannel";
            fupdatemethod = "welcome channel";
            const newWChannel = args[2];
            if(!newWChannel) return;
            // console.log(newWChannel);
            if (checkIfStringHasOnlyDigits(newWChannel)) {
                if (message.guild.channels.cache.find(c => c.id === newWChannel)) {
                    try {
                        await this.connection.query(
                            `UPDATE GuildConfigurable SET welcomeChannel = '${newWChannel}' WHERE guildId = '${message.guild.id}'`
                            );
                            guildCommandPrefixes.set(message.guild.id, newWChannel);
                            StateManager.emit("welcomeFetched", message.guild.id, newWChannel);
                            sucess(method, newWChannel, "welcome channel");
                            // message.channel.send(`Updated guild prefix to ${newWChannel}`);
                          } catch (err) {
                              console.log(err);
                              FUpdate(fupdatemethod, newWChannel);
                              // message.channel.send(`Failed to update guild prefix to ${newWChannel}`);
                          }
                      } else {
                          // message.channel.send("Channel does not exist");
                          FUpdate(fupdatemethod, newWChannel);
      
                          return;
                      }
            } else {
              error();
            }
        }
        else if(args[1].toLowerCase() == 'channel2') {
            method = "byechannel";
            fupdatemethod = "goodbye channel";
            const newBChannel = args[2];
            if(!newBChannel) return;
            if (checkIfStringHasOnlyDigits(newBChannel)) {
                if (message.guild.channels.cache.find(c => c.id === newBChannel)) {
                    try {
                        await this.connection.query(
                            `UPDATE GuildConfigurable SET byeChannel = '${newBChannel}' WHERE guildId = '${message.guild.id}'`
                            );
                            guildCommandPrefixes.set(message.guild.id, newBChannel);
                            StateManager.emit("byeFetched", message.guild.id, newBChannel);
                            sucess(method, newBChannel, "bye channel");
                            // message.channel.send(`Updated guild prefix to ${newBChannel}`);
                          } catch (err) {
                              console.log(err);
                              FUpdate(fupdatemethod, newBChannel);
                              // message.channel.send(`Failed to update guild prefix to ${newBChannel}`);
                          }
                      } else {
                          // message.channel.send("Channel does not exist");
                          FUpdate(fupdatemethod, newBChannel);
                          return;
                      }
            } else {
              error();
            }
        }
        else if(args[1].toLowerCase() == 'role') {
            method = "welcomerole";
            fupdatemethod = "welcome role";
            const newWRole = args[2];
            if(!newWRole) return;
            if (checkIfStringHasOnlyDigits(newWRole)) {
                if (message.guild.roles.cache.get(newWRole)) {
                    try {
                        await this.connection.query(
                            `UPDATE GuildConfigurable SET welcomeRole = '${newWRole}' WHERE guildId = '${message.guild.id}'`
                            );
                            guildCommandPrefixes.set(message.guild.id, newWRole);
                            StateManager.emit("welcomeRoleFetched", message.guild.id, newWRole);
                            sucess(method, newWRole, "welcome role");

                            // message.channel.send(`Updated guild prefix to ${newWRole}`);
                          } catch (err) {
                              console.log(err);
                              FUpdate(fupdatemethod, newWRole);
                              // message.channel.send(`Failed to update guild prefix to ${newWRole}`);
                          }
                      } else {
                          // message.channel.send("Channel does not exist");
                          FUpdate(fupdatemethod, newWRole);
                          return;
                      }
            } else {
              error();
            }
        }
        else if(args[1].toLowerCase() == 'role2') {
            method = "welcomerole2";
            fupdatemethod = "welcome role2";
            const newWRole2 = args[2];
            if(!newWRole2) return;
            if (checkIfStringHasOnlyDigits(newWRole2)) {
                if (message.guild.roles.cache.get(newWRole2)) {
                    try {
                        await this.connection.query(
                            `UPDATE GuildConfigurable SET welcomeRole2 = '${newWRole2}' WHERE guildId = '${message.guild.id}'`
                            );
                            guildCommandPrefixes.set(message.guild.id, newWRole2);
                            StateManager.emit("welcomeRole2Fetched", message.guild.id, newWRole2);
                            sucess(method, newWRole2, "welcome role2");

                            // message.channel.send(`Updated guild prefix to ${newWRole}`);
                          } catch (err) {
                              console.log(err);
                              FUpdate(fupdatemethod, newWRole2);
                              // message.channel.send(`Failed to update guild prefix to ${newWRole}`);
                          }
                      } else {
                          // message.channel.send("Channel does not exist");
                          FUpdate(fupdatemethod, newWRole2);
                          return;
                      }
            } else {
              error();
            }
        }
        else if(args[1].toLowerCase() == 'role3') {
            method = "welcomerole3";
            fupdatemethod = "welcome role3";
            const newWRole3 = args[2];
            if(!newWRole3) return;
            if (checkIfStringHasOnlyDigits(newWRole3)) {
                if (message.guild.roles.cache.get(newWRole3)) {
                    try {
                        await this.connection.query(
                            `UPDATE GuildConfigurable SET welcomeRole3 = '${newWRole3}' WHERE guildId = '${message.guild.id}'`
                            );
                            guildCommandPrefixes.set(message.guild.id, newWRole3);
                            StateManager.emit("welcomeRole3Fetched", message.guild.id, newWRole3);
                            sucess(method, newWRole3, "welcome role3");
                            // message.channel.send(`Updated guild prefix to ${newWRole}`);
                          } catch (err) {
                              console.log(err);
                              FUpdate(fupdatemethod, newWRole3);
                              // message.channel.send(`Failed to update guild prefix to ${newWRole}`);
                          }
                      } else {
                          // message.channel.send("Channel does not exist");
                          FUpdate(fupdatemethod, newWRole3);
                          return;
                      }
            } else {
              error();
            }
        }
        else if(args[1].toLowerCase() == 'settings') {
            method = "welcomesettings";
            try {
                auditlogger(client, method, message.author.id, message.author.tag, message.channel.id, message.guild.id);
                settings(WChannel, BChannel, WRole, WRole2, WRole3);
                // message.channel.send(`Updated guild prefix to ${newWRole}`);
              } catch (err) {
                  console.log(err);
                  return;
                  // message.channel.send(`Failed to update guild prefix to ${newWRole}`);
              }
        }
        else if(args[1].toLowerCase() == 'reset') {
            method = "welcomereset";
            try {
                auditlogger(client, method, message.author.id, message.author.tag, message.channel.id, message.guild.id);
                await this.connection.query(
                  `UPDATE GuildConfigurable SET welcomeChannel = '/' WHERE guildId = '${message.guild.id}'`
                  );
                await this.connection.query(
                  `UPDATE GuildConfigurable SET byeChannel = '/' WHERE guildId = '${message.guild.id}'`
                  );
                await this.connection.query(
                  `UPDATE GuildConfigurable SET welcomeRole = '/' WHERE guildId = '${message.guild.id}'`
                  );
                await this.connection.query(
                  `UPDATE GuildConfigurable SET welcomeRole2 = '/' WHERE guildId = '${message.guild.id}'`
                  );
                await this.connection.query(
                  `UPDATE GuildConfigurable SET welcomeRole3 = '/' WHERE guildId = '${message.guild.id}'`
                  );
                reset(method);
                StateManager.emit("welcomeResetFetched", message.guild.id);
                // message.channel.send(`Updated guild prefix to ${newWRole}`);
              } catch (err) {
                  console.log(err);
                  return;
                  // message.channel.send(`Failed to update guild prefix to ${newWRole}`);
              }
        }
        else if(args[1].toLowerCase() == 'help') {
            method = "welcomehelp";
            auditlogger(client, method, message.author.id, message.author.tag, message.channel.id, message.guild.id);
            const embed = new Discord.MessageEmbed();
            
            embed
            .setColor("BLURPLE")
            .addFields(
                {
                    name: "WORK IN PROGRESS",
                    value: "WORK IN PROGRESS",
                    inline: false,
                    }
                    );
                    
                    message.reply({ embeds: [embed] });
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
    function error() {
        const embed = new Discord.MessageEmbed();
  
        embed
          .setColor("RED")
          .setFooter(message.author.tag)
          .setTimestamp()
          .addFields({
            name: `${languageTranslation(message.guild, "USAGE")}`,
            value: "» `" + prefix + "welcome help` • For more Information",
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
      function FUpdate(method, newWChannel) {
        const embed = new Discord.MessageEmbed();
  
        embed
          .setColor("RED")
          .setFooter(message.author.tag)
          .setTimestamp()
          .addFields({
            name: "ERROR",
            value: "» Failed to update guild "+ method +" to `" + newWChannel + "`",
            inline: false,
          });
  
        message.reply({ embeds: [embed] });
      }
      function sucess(method, newWChannel, guildThing) {
        auditlogger(client, method, message.author.id, message.author.tag, message.channel.id, message.guild.id);
        const embed = new Discord.MessageEmbed();
  
        embed
          .setColor("GREEN")
          .setFooter(message.author.tag)
          .setTimestamp()
          .addFields({
            name: "SUCCESS",
            value: "» Updated guild "+guildThing+" to `" + newWChannel + "`",
            inline: false,
          });
  
        message.reply({ embeds: [embed] });
      }
      function settings(wchannel, bchannel, wrole, wrole2, wrole3) {
        // console.log("Test");
        // console.log(`${wchannel + " " + bchannel + " " + wrole + " " + wrole2 + " " + wrole3}`);
        try {

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
          let wRole5 = wrole2;
          let wRole25 = "» <@&"+ wrole2 + ">";
          if (wRole5 == "/") {
            wRole5 = "unset";
            wRole25 = " ";
          }
          let wRole3 = wrole3;
          let wRole23 = "» <@&"+ wrole3 + ">";
          if (wRole3 == "/") {
            wRole3 = "unset";
            wRole23 = " ";
          }
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
            {
                name: "Welcome role2:",
                value: "» `" + wRole5 + "`\n"+ wRole25 + "",
                inline: false,
            },
            {
                name: "Welcome role3:",
                value: "» `" + wRole3 + "`\n"+ wRole23 + "",
                inline: false,
            },
            );
    
          message.reply({ embeds: [embed] });
        } catch (err) {
          console.log(err);
        }
      }
      function reset(method) {
        // console.log("Test");
        // console.log(`${wchannel + " " + bchannel + " " + wrole + " " + wrole2 + " " + wrole3}`);
        try {
          auditlogger(client, method, message.author.id, message.author.tag, message.channel.id, message.guild.id);
          const embed = new Discord.MessageEmbed();
    
          embed
            .setColor("RED")
            .setFooter(message.author.tag)
            .setTimestamp()
            .addFields({
              name: "RESET",
              value: "» RESETTED ALL SETTINGS",
              inline: false,
            });
    
          message.reply({ embeds: [embed] });
        } catch (err) {
          console.log(err);
        }
      }
    },
});

StateManager.on("prefixFetched", (guildId, prefix) => {
    
    guildCommandPrefixes.set(guildId, prefix);
  });

  StateManager.on("welcomeRoleFetched", (guildId, welcomeChannel) => {
    
    guildCommandWRole.set(guildId, welcomeChannel);
});
StateManager.on("welcomeRole2Fetched", (guildId, welcomeChannel) => {
    
    guildCommandWRole2.set(guildId, welcomeChannel);
});
StateManager.on("welcomeRole3Fetched", (guildId, welcomeChannel) => {
    
    guildCommandWRole3.set(guildId, welcomeChannel);
});


StateManager.on("welcomeFetched", (guildId, welcomeChannel) => {
    
    guildCommandWChannel.set(guildId, welcomeChannel);
});

StateManager.on("welcomeResetFetched", (guildId) => {
    
    guildCommandWChannel.set(guildId, "/");
    guildCommandWRole.set(guildId, "/");
    guildCommandWRole2.set(guildId, "/");
    guildCommandWRole3.set(guildId, "/");
    guildCommandBChannel.set(guildId, "/");
});

StateManager.on("byeFetched", (guildId, byeChannel) => {
    
    guildCommandBChannel.set(guildId, byeChannel);
});
