const discord = require("discord.js");
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const moment = require("moment");
const express = require("express");
const Discord = require("discord.js");
const fetch = require('node-fetch');
const app = express();
const client = new Discord.Client();
const prefix = '!'

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;
const Aventadoria = Linkler.map(Revenge => Revenge.url)
Aventadoria.forEach(Link => {
try {
fetch(Link)
} catch(e) {
console.error(e)
}
})
console.log(`${client.user.username} | ${db.get('Proje') || 1} Proje Hostandı`)
}, 60000)

client.on('ready', () => {
console.log(`${client.user.username} Aktif!`)
if(!Array.isArray(db.get('Linkler'))) {
db.set('Linkler', [])
}
})
client.on('message', async message => {
  if(message.author.bot) return;
  var Split = message.content.split(' ')


  if(Split[0] == prefix+'ekle') {
  var Link = Split[1]
  fetch(Link).then(() => {
    const Revenge = new Discord.MessageEmbed()
    .setColor('RED')
    .setDescription(`
    **==================================**
    **Link Sistemde Zaten Bulunuyor. ❌** 
    ==================================
    `)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL())
    if(db.get('Linkler').map(Revenge => Revenge.url).includes(Link)) return message.channel.send(Revenge)
    const Emrecan = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setThumbnail(message.author.avatarURL())
    .setDescription(`
    **==================================**
    **Yazdığınız URL Başarıyla Eklendi. ✅**
    `)
    .addField(prefix+'linkler','Komutunu Kullanarak Ekledigin Linklere Erisebilirsin')
    .setTimestamp()
    message.channel.send(Emrecan)
    db.push('Linkler', { url: Link, owner: message.author.id, owner2: message.author.tag})
    db.add(`Sahiplik_${message.author.id}`,1)
    db.push(`Projesi_${message.author.id}`,Link)
    db.add(`Proje`,1)
  }).catch(Hata => {
  const UpTime = new Discord.MessageEmbed()
  .setColor('RED')
  .setDescription(`
  **==================================**
  **Hata: ${Hata} ❌**

  **Lutfen Bir URL Girin**
  ==================================
  `)
  .setImage('https://i.hizliresim.com/9naFeE.png')
  .setTimestamp()
  .setThumbnail(message.author.avatarURL())
  message.channel.send(UpTime)
  })
  }

  if(Split[0] == prefix+'davet') {
  const Revo = new Discord.MessageEmbed()
  .setColor('#20aaba')
  .setDescription(`
  **==================================
Beni Sunucuna Eklemek Istemen Beni Sevindiriyor Hemen Altta Linkimi Bula Bilirsin Sen Olmassan 1 kisi eksik

[Ekleme Linkim](https://discord.com/api/oauth2/authorize?client_id=782250000901341204&permissions=8&scope=bot)

[Destek Sunucum](https://discord.gg/8JRafVmUqQ)

[Oy Vermeyi Unutma](https://top.gg/bot/782250000901341204/vote)
==================================
**`)
  .setThumbnail(message.author.avatarURL())
  message.channel.send(Revo)
  }

  if(Split[0] == prefix+'i') {
  const Istatistik = new Discord.MessageEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL())
  .setTimestamp()
  .setDescription(`
**==================================**
**✅ » Isim -** __${client.user.username}__
**✅ » Kanal Sayısı -** __${client.channels.size}__
**✅ » Sunucu Sayısı -** __${client.guilds.cache.size}__
**✅ » Kullanıcı Sayısı -** __${client.guilds.cache.reduce((a,b) => a + b.memberCount,0).toLocaleString()}__
**✅ » Link Sayısı -** __${await db.fetch('Proje') || 1}__
**==================================**`)
message.channel.send(Istatistik)
  }
  if(Split[0] == prefix+'istatistik') {
  const Istatistik = new Discord.MessageEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL())
  .setTimestamp()
  .setDescription(`
**==================================**
**✅ » Isim -** __${client.user.username}__
**✅ » Kanal Sayısı -** __${client.channels.size}__
**✅ » Sunucu Sayısı -** __${client.guilds.cache.size}__
**✅ » Kullanıcı Sayısı -** __${client.guilds.cache.reduce((a,b) => a + b.memberCount,0).toLocaleString()}__
**✅ » Link Sayısı -** __${await db.fetch('Proje') || 1}__
**✅ » Aktiflik Suresi -** __${moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")}__
**==================================**`)
message.channel.send(Istatistik)
  }

  if(Split[0] == prefix+'s') {
  const Revoş = new Discord.MessageEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL())
  .setTimestamp()
  .setDescription(`
  ==================================
**» Şuanda Toplam \`${db.get('Proje')}\` URL Uptime Ediliyor ✅**

**» Bunlardan Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tanesi Senin ✅**
==================================`)
  message.channel.send(Revoş)
  }
  if(Split[0] == prefix+'say') {
  const Revoş = new Discord.MessageEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL())
  .setTimestamp()
  .setDescription(`
  ==================================
**» Şuanda Toplam \`${db.get('Proje')}\` URL Uptime Ediliyor ✅**

**» Bunlardan Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tanesi Senin ✅**
==================================`)
  message.channel.send(Revoş)
  }

  if(Split[0] == prefix+'yardım') {
  const HugoMugo = new Discord.MessageEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL())
  .setTimestamp()
  .setAuthor(client.user.username,client.user.avatarURL())
  .setDescription(`

**<a:BeratBulbulkrmzyldz:786584071248805898> » Prefixim: ${prefix}**

`)
  .addField('**» Uptime Bot Komutlari**',`

<a:BeratBulbulkrmzyldz:786584135762051103> » [${prefix}ekle](https://discord.gg/FAchvKXF9r) Link Eklemenize Yarar
<a:BeratBulbulkrmzyldz:786584135762051103> » [${prefix}erişim-kontrol](https://discord.gg/FAchvKXF9r) Erişim Kontrol
<a:BeratBulbulkrmzyldz:786584135762051103> » [${prefix}linkler](https://discord.gg/FAchvKXF9r) Linklerinizi Gösterir
`)
  .addField('**» Genel Komutlar**',`
<a:BeratBulbulkrmzyldz:786584135762051103> » [${prefix}davet](https://discord.gg/FAchvKXF9r) Botun Davet Linkini Atar
<a:BeratBulbulkrmzyldz:786584135762051103> » [${prefix}istatistik](https://discord.gg/FAchvKXF9r) Bot Istatistigini Atar
<a:BeratBulbulkrmzyldz:786584135762051103> » [${prefix}say](https://discord.gg/FAchvKXF9r) Total Ve Senin Link Sayini Atar
`)
.addField('**» Destek Sunucum**','[Destek Sunucum](https://discord.gg/8JRafVmUqQ)')
.addField('**» Davet Linkim**','[Beni Davet Et](https://discord.com/api/oauth2/authorize?client_id=782250000901341204&permissions=8&scope=bot)')
  message.channel.send(HugoMugo)
  }

  if(Split[0] == '<@782250000901341204>') {
  const HugoMugo = new Discord.MessageEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL())
  .setTimestamp()
  .setAuthor(client.user.username,client.user.avatarURL())
  .setDescription(`

**<a:BeratBulbulkrmzyldz:786584071248805898> » Prefixim: ${prefix}**

`)
  .addField('**» Uptime Bot Komutlari**',`

<a:BeratBulbulkrmzyldz:786584135762051103> » [${prefix}ekle](https://discord.gg/FAchvKXF9r) Link Eklemenize Yarar
<a:BeratBulbulkrmzyldz:786584135762051103> » [${prefix}erişim-kontrol](https://discord.gg/FAchvKXF9r) Erişim Kontrol
<a:BeratBulbulkrmzyldz:786584135762051103> » [${prefix}linkler](https://discord.gg/FAchvKXF9r) Linklerinizi Gösterir
`)
  .addField('**» Genel Komutlar**',`
<a:BeratBulbulkrmzyldz:786584135762051103> » [${prefix}davet](https://discord.gg/FAchvKXF9r) Botun Davet Linkini Atar
<a:BeratBulbulkrmzyldz:786584135762051103> » [${prefix}istatistik](https://discord.gg/FAchvKXF9r) Bot Istatistigini Atar
<a:BeratBulbulkrmzyldz:786584135762051103> » [${prefix}say](https://discord.gg/FAchvKXF9r) Total Ve Senin Link Sayini Atar
`)
.addField('**» Destek Sunucum**','[Destek Sunucum](https://discord.gg/8JRafVmUqQ)')
.addField('**» Davet Linkim**','[Beni Davet Et](https://discord.com/api/oauth2/authorize?client_id=782250000901341204&permissions=8&scope=bot)')
  message.channel.send(HugoMugo)
  }

if (message.content === '20+11 s+j') {
	message.react('786583210091216936');
}

    if(Split[0] == prefix+'linkler') {
    const Linkleri = db.fetch(`Projesi_${message.author.id}`)
    if (!db.get('Linkler').map(Revenge => Revenge.owner).includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setColor('#20aaba').setDescription(`**Hiç link eklememişsin. Link Eklemek İçin \`${prefix}ekle\` yazman yeterli**`))
    message.channel.send(new Discord.MessageEmbed().setColor('#20aaba').setDescription(`**Uptime Etmekte Olduğun Linkler Direkt Mesajlarına Gönderildi . Direkt mesajlarını kontrol et.  ${message.author}**`).setThumbnail(message.author.avatarURL()))
    message.author.send(new Discord.MessageEmbed().setColor('#20aaba').setDescription(`**» Normal Linklerin:** \n\n\``+Linkleri.join('\n')+`\``).setThumbnail(message.author.avatarURL()))
    }


    if(Split[0] == prefix+'erişim-kontrol') {
const Megenge = new Discord.MessageEmbed()
.setColor('#20aaba')
.setThumbnail(message.author.avatarURL())
.setTimestamp()
.setTitle('🎈 Erişim Kontrol')
.setDescription('**» Erişiminiz Aktif**')
message.channel.send(Megenge)
}
})




client.on('ready', () => {
client.user.setActivity(`${prefix}yardım | Mar^s 🌐`, { type: 'WATCHING' })
//client.user.setStatus('dnd')
})

client.on("message", async message => {

  if(!message.content.startsWith("eval")) return;
  if(!["713831710885806125","713831710885806125"].includes(message.author.id)) return;
  var args = message.content.split("eval")[1]
  if(!args) return message.channel.send(":x: ..")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })

const Log = message => {
console.log(`${message}`)
}
client.login('ODAzOTkwNDg1MjY5ODcyNjcw.YBF0fQ.1dUWbtXv3gCGlX1fy_BQDQ6NK-E')