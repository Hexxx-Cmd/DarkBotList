const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const useful = require('useful-tools');
client.ayar = db;

client.htmll = require('cheerio');
client.useful = useful;
client.tags = require('html-tags');

let profil = JSON.parse(fs.readFileSync('./profil.json', 'utf8'))
client.profil = profil

client.ayarlar = {
  "prefix": "!", //prefix
  "oauthSecret": "fNfWmTwu6bVfD7dHTgEYec1G5EDrhJ1d", //bot secreti
	"callbackURL": "https://spangled-vast-spectacles.glitch.me/callback", //benim sitenin urlsini kendin ile değiş "/callback" kalacak!
	"kayıt": "674389576915222536", //onaylandı, reddedildi, başvuru yapıldı falan kayıtların gideceği kanalın ID'ini yazacaksın
  "renk": "#7289DA" //embedların rengini burdan alıo can sıkıntısdna yapılmış bişe falan fln
};

client.yetkililer = ["543858517832892442","404206792005124096","378218497571815435","615646611090964511"] //tüm yetkililerin ıdleri gelcek array
client.webyetkililer = ["543858517832892442","404206792005124096","378218497571815435","615646611090964511"] //web yetkililerin ıdleri gelcek array
client.sunucuyetkililer = ["543858517832892442","404206792005124096","378218497571815435","615646611090964511"] //sunucu yetkililerin ıdleri gelcek array

//

client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./jsonlar/otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./jsonlar/otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
  let giriscikis = JSON.parse(fs.readFileSync("./jsonlar/otorol.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('OTOROL SİSTEMİ')
    .setDescription(`SUNUCUYA HOŞGELDİN \`@${member.user.tag}\` OTOMATİK ROL VERİLDİ`)
.setColor("ORANGE")
    .setFooter("HBOT", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    let embed = new Discord.RichEmbed()
   .setTitle('OTOROL SİSTEMİ')
    giriscikiskanali.send(`》SUNUCUYA HOŞGELDİN \`@${member.user.tag}\` OTOMATİK ROL VERİLDİ《`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

  //let embed = new Discord.RichEmbed()
   // .setTitle('OTOROL SİSTEMİ')
    //.setDescription(`》<a:DOLUYOR:623950994115395604> | SUNUCUYA HOŞGELDİN \`@${member.user.tag}\` OTOMATİK ROL VERİLDİ《`)
//.setColor("ORANGE")
    //.setFooter("HBOT", client.user.avatarURL);
  
});

client.on("guildMemberAdd", async (member) => {
      let autorole =  JSON.parse(fs.readFileSync("./jsonlar/otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi

      member.addRole(role)

});




//

client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);
  
   require("./app.js")(client);
  
  client.user.setActivity(`SnowBots`, { type:"WATCHING" })
  
  console.log("Aktif!")
});

setInterval(() => {

	if (db.has('botlar') && db.has('kbotlar')) {

for (var i = 0; i < Object.keys(db.fetch('kbotlar')).length; i++) {
for (var x = 0; x < Object.keys(db.fetch('botlar')).length; x++) {
var bot = Object.keys(db.fetch('botlar'))[x]
var user = Object.keys(db.fetch('kbotlar'))[i]
if (db.has(`oylar.${bot}.${user}`)) {
   setTimeout(() => {
        db.delete(`oylar.${bot}.${user}`)
    }, require('ms')(`${client.useful.seg(db.fetch(`oylar.${bot}.${user}`), 6)}h`));
}
}
}

	}

}, 10000);

const chalk = require('chalk')

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir(`./komutlar/`, (err, files) => {
	let jsfiles = files.filter(f => f.split(".").pop() === "js")

	if(jsfiles.length <= 0) {
		console.log("Olamazz! Hiç komut dosyası bulamadım!")
	} else {
		if (err) {
			console.error("Hata! Bir komutun name veya aliases kısmı yok!")
		}
		console.log(`${jsfiles.length} komut yüklenecek.`)

		jsfiles.forEach(f => {
			let props = require(`./komutlar/${f}`)
			client.commands.set(props.help.name, props)
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name)
			})
			console.log(`Yüklenen komut: ${props.help.name}`)
		})
	}
});

client.on("message", async message => {

	if (message.author.bot) return
	if (!message.content.startsWith('!')) return
	var command = message.content.split(' ')[0].slice('!'.length)
	var args = message.content.split(' ').slice(1)
	var cmd = ''

	if (client.commands.has(command)) {
		var cmd = client.commands.get(command)
	} else if (client.aliases.has(command)) {
		var cmd = client.commands.get(client.aliases.get(command))
	}

	if (cmd) {
    if (cmd.conf.permLevel === 'ozel') { //o komutu web yetkilileri kullanabsiln sadece diye yaptıgım bişe 
      if (client.yetkililer.includes(message.author.id) === false) {
        const embed = new Discord.RichEmbed()
					.setDescription(`Kardeşim sen WebSite yetkilisi değilsin saçma saçma işlerle uğraşma!`)
					.setColor(client.ayarlar.renk)
					.setTimestamp()
				message.channel.send("Yetersiz Yetki.")
				return
      }
    }
    
		if (cmd.conf.permLevel === 1) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Sen önce mesajları yönetmeyi öğren sonra bu komutu kullanırsın.`)
					.setColor(client.ayarlar.renk)
					.setTimestamp()
				message.channel.send("Yetersiz yetki.")
				return
			}
		}
		if (cmd.conf.permLevel === 2) {
			if (!message.member.hasPermission("KICK_MEMBERS")) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Üyeleri atma yetkin yok.`)
					.setColor(client.ayarlar.renk)
					.setTimestamp()
				message.channel.send("Üyeleri atma yetkin yok.")
				return
			}
		}
		if (cmd.conf.permLevel === 3) {
			if (!message.member.hasPermission("ADMINISTRATOR")) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Yetersiz yetki.`)
					.setColor(client.ayarlar.renk)
					.setTimestamp()
				message.channel.send("Yetersiz yetki.")
				return
			}
		}
		if (cmd.conf.permLevel === 4) {
			const x = await client.fetchApplication()
      var arr = [x.owner.id, '430011871555223553']
			if (!arr.includes(message.author.id)) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Yetkin yetersiz.`)
					.setColor(client.ayarlar.renk)
					.setTimestamp()
				message.channel.send("Yetersiz yetki.")
				return
			}
		}
		if (cmd.conf.enabled === false) {
			const embed = new Discord.RichEmbed()
				.setDescription(`Bu komut devre dışı.`)
				.setColor(client.ayarlar.renk)
				.setTimestamp()
			message.channel.send("Bu komut devre dışı.")
			return
		}
		if(message.channel.type === "dm") {
			if (cmd.conf.guildOnly === true) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komutu özel mesajlarda kullanamazsın.`)
					.setColor(client.ayarlar.renk)
					.setTimestamp()
				message.channel.send("[BU KOMUT ÖZEL MESAJLARDA DEVRE DIŞIDIR]")
				return
			}
		}
		cmd.run(client, message, args)
	}
});

client.login("Njc0Mzg5NTc2OTE1MjIyNTM2.XlcZYQ.WBugKEinErU3biKyXU8az_3j_M4") //tokeni yaz işte

process.env = {}
process.env.TOKEN = "Njc0Mzg5NTc2OTE1MjIyNTM2.XlcZYQ.WBugKEinErU3biKyXU8az_3j_M4";