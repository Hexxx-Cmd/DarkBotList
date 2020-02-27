const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
	if(!args[0]) {
		const embed = new Discord.RichEmbed()
			.setDescription(`BİR İD YAZINIZ`)
			.setColor(client.ayarlar.renk)
		message.channel.send({embed})
		return
	}
  
  if(!client.users.has(args[0])) {
		const embed = new Discord.RichEmbed()
			.setDescription(`GEÇERSİZ İD`)
			.setColor(client.ayarlar.renk)
		message.channel.send({embed})
		return
	}
  
  if(!client.users.get(args[0]).bot) {
		const embed = new Discord.RichEmbed()
			.setDescription(`BU KİŞİ BOT DEĞİL`)
			.setColor(client.ayarlar.renk)
		message.channel.send({embed})
		return
	}
  
	if (db.has('botlar')) {
			if (Object.keys(db.fetch('botlar')).includes(args[0]) === false)  return message.reply("THIS BOAT IS NOT AVAILABLE IN THE SYSTEM")
	}
  
  if (db.has('botlar')) {
  if (db.has(`botlar.${args[0]}.sertifika`) === true) return message.reply("THIS BOT CERTIFIED ALREADY")
  }
  
  message.channel.send(`BAŞARIYLA \`${args[0]}\` ID'Lİ BOT SERİTİFİKALI OLDU`)
  client.channels.get(client.ayarlar.kayıt).send(`✔️ |  \`${db.fetch(`botlar.${args[0]}.sahip`)}\` USER'S \`${db.fetch(`botlar.${args[0]}.isim`)}\` CERTIFICATE GIVEN TO THE BOARD`)
	
  db.set(`botlar.${args[0]}.sertifika`, "Bulunuyor")
  
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 'ozel',
	kategori: 'yetkili'
}

exports.help = {
	name: 'sertifika-ver',
	description: 'Yazılan ID\'deki botu sertifikalı yapar.',
	usage: 'sertifika-ekle [ID]'
}