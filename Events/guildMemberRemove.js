const Event = require("../Structures/Event.js");
const Discord = require("discord.js");
const config = require("../Data/config.json");
const StateManager = require("../StateManager");
const guildCommandBChannel = new Map();

module.exports = new Event("guildMemberRemove", async (client, member) => {
    setTimeout(function(){

        const BChannel = guildCommandBChannel.get(member.guild.id);
        if (BChannel == "/") return;
        const channel = member.guild.channels.cache.find(i => i.id === BChannel);
        
        if (!channel) return;
        
        const embed = new Discord.MessageEmbed();
        embed
        .setAuthor("User verlassen", member.guild.iconURL())
        .setDescription(`Auf Wiedersehen, ${member.user.tag}\n`)
        .setColor("RED")
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setFooter("Pandaa Systems")
        .setTimestamp();
        
        channel.send({ embeds: [embed] });
    }, 3000);
});

StateManager.on("byeFetched", (guildId, welcomeChannel) => {
    // console.log(guildId, prefix);
    guildCommandBChannel.set(guildId, welcomeChannel);
  });
  