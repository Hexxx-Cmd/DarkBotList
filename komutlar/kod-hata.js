const Discord = require('discord.js');


exports.run = function(client, message, args) {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send(
new Discord.RichEmbed()
.setColor('BLUE')
.setDescription('WRITE IN WRONG WRITTEN REQUEST CODE NAME ')).then(msg => msg.delete(5000));

const embed = new Discord.RichEmbed()
.setColor('BLUE')
.setDescription(`WE RECEIVED YOUR REQUEST`)
message.channel.send(embed)
const embed2 = new Discord.RichEmbed()
.setColor("BLUE")
.setDescription(`REQUEST STATEMENT`)
.addField(`\nUSER INFORMATION`,` \nUSER ID: ${message.author.id} \nUSERNAME: ${message.author.username} \nUser Tag: #${message.author.discriminator}`)
.addField(`\nSUNUCU BİLGİLERİ`,` \nSUNUCU İSMİ: ${message.guild.name} \nSUNUCU ID: ${message.guild.id}`)
.addField("İSTENEN KOD", type)
.setThumbnail(message.author.avatarURL)
client.channels.get('682575198536728606').send(embed2); // Kanal ID 

};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'kod-hata',
  description: '',
  usage: ''
}