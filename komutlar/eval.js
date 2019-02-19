const Discord = require('discord.js')
const util = require('util');
const tokenuyari = `SyntaxError: Unexpected token (token protect heçkırs and ayyildiztim veleds)`
const db = require('quick.db');

exports.run = async (client, message, args) => {
	if(!args[0]) {
		const embed = new Discord.RichEmbed()
			.setDescription(`Kod yaz!`)
			.setColor(client.ayarlar.renk)
			.setTimestamp()
		message.channel.send({embed})
		return
	}
	const code = args.join(' ');
	/*if(code.match(/(client.token)/g)) {
		const newEmbed = new Discord.RichEmbed()
			.addField('Hata çıktı;', `\`\`\`xl\n${tokenuyari}\`\`\``)
			.setColor('#FF0000');
		message.channel.send(newEmbed);
		return
	}*/

	function clean(text) {
		if (typeof text !== 'string')
			text = require('util').inspect(text, { depth: 0 })
		text = text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203))
		return text;
	};

	const evalEmbed = new Discord.RichEmbed().setColor(client.ayarlar.renk)
	try {
		var evaled = clean(await eval(code));
		if(evaled.startsWith('NTQ3M')) evaled = tokenuyari;
		if (evaled.constructor.name === 'Promise') evalEmbed.setDescription(`\`\`\`\n${evaled}\n\`\`\``)
		else evalEmbed.setDescription(`\`\`\`js\n${evaled}\n\`\`\``)
		const newEmbed = new Discord.RichEmbed()
			.addField('📥 Giriş', `\`\`\`javascript\n${code}\n\`\`\``)
			.addField('📤 Çıkış', `\`\`\`js\n${evaled}\`\`\``)
			.setColor(client.ayarlar.renk)
		message.channel.send(newEmbed);
	}
	catch (err) {
		evalEmbed.addField('Hata çıktı;', `\`\`\`js\n${err}\n\`\`\``);
		evalEmbed.setColor('#FF0000');
		message.channel.send(evalEmbed);
	}
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 4,
	kategori: 'yapımcı'
}

exports.help = {
	name: 'eval',
	description: 'Yazılan kodu çalıştırır.',
	usage: 'eval [kod]'
}