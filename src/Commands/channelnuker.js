const Discord = require("discord.js");
const languageTranslation = require("../language");
const auditlogger = require("../audit-log");

const Command = require("../Structures/Command.js");


module.exports = new Command({
  name: "nuke",
  description: "Nukes channel",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    const owner = await message.guild.fetchOwner();
    if(message.member.id === owner.user.id || "492749274648543233") {

        msg = await message.channel.send('☢️ TACTICAL NUKE INCOMMING ☢️');
        var count = args[1];
        count++;
        if (!count) {
            count = 10;
        } else if (count > 121) {
            count = 121;
        }
        function anim() {
            if (count > 1) {
                // console.log(count);
                count--;
                msg.edit('☢️ TACTICAL NUKE INCOMMING ☢️\n' + String(count));
                setTimeout(anim, 1250);
            }
            else {
                // alert('end of counting')
                message.channel.clone().then((clonedChannel) => {
                    const originalPosition = message.channel.position;
                    const link = 'https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif';
                    clonedChannel.send('☢️ Channel nuked ☢️');
                    clonedChannel.send(link);
                    message.channel.delete();
                    clonedChannel.setPosition(originalPosition);
                    auditlogger(client, "nuke", message.author.id, message.author.tag, clonedChannel, message.guild.id);
                });
            }
        }
        setTimeout(function(){ 
            
            anim();
        }, 1250);
        
    }
    },
});