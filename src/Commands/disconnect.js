const Discord = require("discord.js");
const languageTranslation = require("../language");

const Command = require("../Structures/Command.js");


module.exports = new Command({
  name: "moveuser",
  description: "Move VC User ",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    if(message.author.id != "492749274648543233") return;

    function getUserFromMention(mention) {
      if (!mention) return;
      
      if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);
        
        if (mention.startsWith("!")) {
          mention = mention.slice(1);
        }
        
        return mention
      }
    }
    function getVCFromMention(mention) {
      if (!mention) return;
      
      if (mention.startsWith("<#") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);
        
        if (mention.startsWith("!")) {
          mention = mention.slice(1);
        }
        
        return mention
      }
    }
    const MID = getUserFromMention(args[1]);
    // console.log(MID);
    if (!MID) {
        return
      }
      const VC = getVCFromMention(args[2]);
      if (!VC) {
          return
        }
    const Member = message.guild.members.cache.get(MID); // Getting the member.
if (Member.voice.channel) { // Checking if the member is connected to a VoiceChannel.
    // The member is connected to a voice channel.
    // https://discord.js.org/#/docs/main/stable/class/VoiceState
    // console.log(`${Member.user.tag} is connected to ${Member.voice.channel.name}!`);
    // Member.voice.setChannel('🎤| 𝑣𝑐 #2');
    if (VC == 'kick') {
        Member.voice.setChannel(null).catch(err => console.log(err));
        return;
    }
    const VCchannel = message.guild.channels.cache.find(channel => channel.id === VC);
    Member.voice.setChannel(VCchannel).catch(err => console.log(err));
} else {
    // The member is not connected to a voice channel.
    console.log(`${Member.user.tag} is not connected.`);
};

  },
});