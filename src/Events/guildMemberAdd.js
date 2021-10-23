const Event = require("../Structures/Event.js");
const Discord = require("discord.js");
const config = require("../Data/config.json");
const StateManager = require("../StateManager");
const guildCommandWChannel = new Map();
const guildCommandWRole = new Map();
const guildCommandWRole2 = new Map();
const guildCommandWRole3 = new Map();


module.exports = new Event("guildMemberAdd", async (client, member) => {
    setTimeout(function(){

        const WChannel = guildCommandWChannel.get(member.guild.id);
        if (WChannel == "/") return;
        
        // console.log(WRole);
        const channel = member.guild.channels.cache.find(i => i.id === WChannel);
        
        if (!channel) return;
        
        const embed = new Discord.MessageEmbed();
        embed
        .setAuthor("User beigetreten", member.guild.iconURL())
        .setDescription(`Wilkommen auf ${member.guild}, <@${member.user.id}>\n`)
        .setColor("GREEN")
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setFooter("Pandaa Systems")
        .setTimestamp();
        
        channel.send({ embeds: [embed] });
        
        const WRole = guildCommandWRole.get(member.guild.id);
        const WRole2 = guildCommandWRole2.get(member.guild.id);
        const WRole3 = guildCommandWRole3.get(member.guild.id);
        setTimeout(function(){ 
            
            if (WRole != "/") {
                member.roles.add(member.guild.roles.cache.find(i => i.id === WRole));
            } else {
                return;
            }
            if (WRole2 != "/") {
                member.roles.add(member.guild.roles.cache.find(i => i.id === WRole2));
            } else {
                return;
            }
            if (WRole3 != "/") {
                member.roles.add(member.guild.roles.cache.find(i => i.id === WRole3));
            } else {
                return;
            }
        }, 3000);
    }, 3000);
    });
    
    StateManager.on("welcomeFetched", (guildId, welcomeChannel) => {
        // console.log(guildId, prefix);
        guildCommandWChannel.set(guildId, welcomeChannel);
    });
    
    StateManager.on("welcomeRoleFetched", (guildId, welcomeRole) => {
        // console.log(guildId, prefix);
        guildCommandWRole.set(guildId, welcomeRole);
    });
    StateManager.on("welcomeRole2Fetched", (guildId, welcomeRole2) => {
    // console.log(guildId, prefix);
    guildCommandWRole2.set(guildId, welcomeRole2);
    });
    StateManager.on("welcomeRole3Fetched", (guildId, welcomeRole3) => {
    // console.log(guildId, prefix);
    guildCommandWRole3.set(guildId, welcomeRole3);
    });
  