const Discord = require('discord.js');


exports.run = function(client, message, args) {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send(
new Discord.RichEmbed()
.setColor('BLUE')
.setDescription('YANLIŞ ŞEKİLDE GİRDİNİZ İSTEK KOD ADINI BELİRTİNİZ')).then(msg => msg.delete(5000));

const embed = new Discord.RichEmbed()
.setColor('BLUE')
.setDescription(`İSTEĞİNİZİ ALDIK`)
message.channel.send(embed)
const embed2 = new Discord.RichEmbed()
.setColor("BLUE")
.setDescription(`İSTEK BİLDİRİSİ`)
.addField(`\nKULLANICI BİLGİLERİ`,` \nKULLANICI ID: ${message.author.id} \nKULLANICI ADI: ${message.author.username} \nKULLANICI TAGI: #${message.author.discriminator}`)
.addField(`\nSUNUCU BİLGİLERİ`,` \nSUNUCU İSMİ: ${message.guild.name} \nSUNUCU ID: ${message.guild.id}`)
.addField("İSTENEN KOD", type)
.setThumbnail(message.author.avatarURL)
client.channels.get('624870823148126239').send(embed2); // Kanal ID 

};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'istek-kod',
  description: '',
  usage: ''
};