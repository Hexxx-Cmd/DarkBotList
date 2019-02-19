const Discord = require('discord.js');
const db = require('quick.db')
const request = require('request')

exports.run = async (client, msg, args) => {
    let prefix = await db.fetch(`${msg.guild.id}.prefix`) || client.ayarlar.prefix
    if(!args[0]) {
      return msg.channel.send(new Discord.RichEmbed().setDescription('Lütfen bir bot ID\'i giriniz!').setColor("RANDOM"))
    }
    request(`https://fiboxbotlist.glitch.me/api/botlar/${args[0]}`, function (error, response, body) {
    if (error) return msg.channel.send('Hata:', error);
    else if (!error) {
      var a = JSON.parse(body).isim
      var b = JSON.parse(body).id
      var c = `${JSON.parse(body).avatar}`
      var d = JSON.parse(body).prefix
      var e = JSON.parse(body).kütüphane
      var f = `${JSON.parse(body).sahip} (${JSON.parse(body).sahipid})`
      var g = JSON.parse(body).kisa_aciklama
      var h = JSON.parse(body).etiketler
      if(JSON.parse(body).destek_sunucusu === 'Belirtilmemiş') {
        var i = 'Belirtilmemiş'
      } else {
        var i = `[${a} Destek Sunucusu](${JSON.parse(body).destek_sunucusu})`
      }
      if(JSON.parse(body).web_sitesi === 'Belirtilmemiş') {
        var j = 'Belirtilmemiş'
      } else {
      var j = JSON.parse(body).web_sitesi
      }
      if(JSON.parse(body).github === 'Belirtilmemiş')  {
        var k = 'Belirtilmemiş'
      } else {
        var k = `[Github](${JSON.parse(body).github})`
      }
      var l = JSON.parse(body).sertifika
      var m = JSON.parse(body).durum
      var n = JSON.parse(body).oy_sayisi
    }
      
      request(`https://fiboxbotlist.glitch.me/api/tumbotlar`, function (errorr, responsee, bodyy) {
    if (errorr) return msg.channel.send('Hata:', errorr);
    else if (!errorr) {
    if (bodyy.includes(args[0])=== false) return msg.reply("Bu ID'de bir bot sistemde bulunmamaktadır!")
    }
       })
      
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(c)
    .setTitle(`DiscordBotsTR - Bot Arama`)
    .setDescription(`${a} (${b}) [${n} oy]`, c)
    .addField('Prefix', d)
    .addField('Sahip', f)
    .addField('Kısa Açıklama', g)
    .addField('Etiketler', h)
    .addField('Sertifika', l)
    .addField('Onay Durumu', m)
    .addField("Web Sitesi", j)
    .addField('Github', k)
    .addField('Destek Sunucusu', i)
    .setFooter('https://tr-discordbotlar.cf sisteminde bot aramaktadır.')
    msg.channel.send({embed})
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['search-bot', 'find-bot', 'botara'],
  permLevel: 0,
  kategori: 'genel'
};

exports.help = {
  name: 'bot-ara',
  description: 'DiscordBotsTR sistemindeki botları aramanızı sağlar.',
  usage: 'bot-ara [bot id]'
};