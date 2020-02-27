const Discord = require('discord.js');


exports.run = function(client, message, args) {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send(
new Discord.RichEmbed()
.setColor('BLUE')
.setDescription('YANLIŞ ŞEKİLDE GİRDİNİZ HATALI KODU BELİRTİNİZ')).then(msg => msg.delete(5000));

const embed = new Discord.RichEmbed()
.setColor('BLUE')
.setDescription(`BİLDİRİNİZİ ALDIK`)
message.channel.send(embed)
const embed2 = new Discord.RichEmbed()
.setColor("BLUE")
.setDescription(`KOD HATA`)
.addField(`\nKULLANICI BİLGİLERİ`,` \nKULLANICI ID: ${message.author.id} \nKULLANICI ADI: ${message.author.username} \nKULLANICI TAGI: #${message.author.discriminator}`)
.addField(`\nSUNUCU BİLGİLERİ`,` \nSUNUCU İSMİ: ${message.guild.name} \nSUNUCU ID: ${message.guild.id}`)
.addField("HATALI KOD", type)
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