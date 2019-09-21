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
			if (Object.keys(db.fetch('botlar')).includes(args[0]) === false)  return message.reply("BU BOT SİSTEMDE BULUNMAMAKTA")
	}
  
  if (db.has('botlar')) {
  if (db.has(`botlar.${args[0]}.sertifika`) === true) return message.reply("BU BOT SERTİFİKALI ZATEN")
  }
  
  message.channel.send(`BAŞARIYLA \`${args[0]}\` ID'Lİ BOT SERİTİFİKALI OLDU`)
  client.channels.get(client.ayarlar.kayıt).send(`\`${message.author.tag}\` ADLI YETKİLİ TARAFINDAN \`${db.fetch(`botlar.${args[0]}.sahip`)}\` ADLI KULLANICININ \`${db.fetch(`botlar.${args[0]}.isim`)}\` ADLI BOTUNA SERTİFİKA VERİLDİ`)
	
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
	name: 'sertifika-ekle',
	description: 'Yazılan ID\'deki botu sertifikalı yapar.',
	usage: 'sertifika-ekle [ID]'
}