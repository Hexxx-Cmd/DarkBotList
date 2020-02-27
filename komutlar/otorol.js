const fs = require ('fs')
const Discord = require('discord.js')
var sunucuyaözelayarlarOtorol = JSON.parse(fs.readFileSync("./jsonlar/otorol.json", "utf8"));


exports.run = async (bot, message, args) =>
{
  	let profil = JSON.parse(fs.readFileSync("./jsonlar/otorol.json", "utf8"));
  var mentionedChannel = message.mentions.channels.first();
if (!mentionedChannel && args[0] !== "sıfırla") return message.channel.sendEmbed(new Discord.RichEmbed().setColor('#7289DA').setAuthor("》HATA《").setDescription(`》OTOROL İÇİN ROL VE KANAL ETİKETLEYİNİZ《`)).then(m => m.delete(5000))
  if (message.guild.member(message.author.id).hasPermission(0x8))
    
    {
      var mentionedRole = message.mentions.roles.first();
      if (!mentionedRole) return message.channel.send("".then(msg => msg.delete(5000)));
      
      //    if (!mentionedChannel && args[0] !== "sıfırla") return message.channel.sendEmbed(new Discord.RichEmbed().setColor('ORANGE').setAuthor("》HATA《").setDescription(`》KİMİ BANLAYACAĞIM《`)).then(m => m.delete(5000))

	if(!profil[message.guild.id]){
    
		profil[message.guild.id] = {
      
			sayi: mentionedRole.id,
      kanal: mentionedChannel.id
		};
	}
	
	profil[message.guild.id].sayi = mentionedRole.id
  profil[message.guild.id].kanal = mentionedChannel.id
	
	fs.writeFile("./jsonlar/otorol.json", JSON.stringify(profil), (err) => {
		console.log(err)

	})

	
		message.channel.sendEmbed(new Discord.RichEmbed().setColor('#7289DA').setAuthor("》SNOW BOT LIST SYSTEM《").setDescription(`》SNOW BOT LIST SYSTEM《`)).then(m => m.delete(5000))
		
}

}



exports.conf =
{
  enabled: true,
  guildOnly: true,
  aliases: [""],
   permLevel: 2
}

exports.help =
{
  name: 'otorol-aç',
  description: '',
  usage: ''
}