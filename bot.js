const discord = require("discord.js");
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const moment = require("moment");
const express = require("express");
const Discord = require("discord.js")
const fetch = require('node-fetch');
const app = express();
const client = new Discord.Client();
const prefix = '!' //PREFİXİNİZİ GİRİNİZ.

client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);

client.user.setActivity(`!yardım | 18 Bot Uptime `, { type: "PLAYING" });

  console.log("`Keevz Bot!");
});

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;
const De = Linkler.map(Revenge => Revenge.url)
De.forEach(Link => {
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
    
    **Link Sistemde Zaten Bulunuyor. ❌** 

    `)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL)
    if(db.get('Linkler').map(Revenge => Revenge.url).includes(Link)) return message.channel.send(Revenge)
    const success = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`
    
    **✅ Yazdığınız URL Başarıyla Sistemimize Eklendi. ✅**
    `)
    .addField(prefix+'linkler','Komutunu Kullanarak Ekledigin Linkleri Görebilirsin!')//PARADOX-DEVELOPMENT
    .setTimestamp()//PARADOX-DEVELOPMENT
    message.channel.send(success)
    db.push('Linkler', { url: Link, owner: message.author.id, owner2: message.author.tag})//PARADOX-DEVELOPMENT
    db.add(`Sahiplik_${message.author.id}`,1)//PARADOX-DEVELOPMENT
    db.push(`Projesi_${message.author.id}`,Link)//PARADOX-DEVELOPMENT
    db.add(`Proje`,1)
  }).catch(Hata => {
  const dijitaluptime = new Discord.MessageEmbed()
  .setColor('RED')
  .setDescription(`

  **⛔ Lütfen Bir URL Girin! ⛔**

  `)
  .setThumbnail(message.author.avatarURL)//PARADOX-DEVELOPMENT
  message.channel.send(dijitaluptime)//PARADOX-DEVELOPMENT
  })
  }

  



  if(Split[0] == prefix+'say') {
  const say = new Discord.MessageEmbed()//PARADOX-DEVELOPMENT
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)//PARADOX-DEVELOPMENT
  .setDescription(`
  
**-> Keevz Uptime Bot Şuanda Toplam \`${db.get('Proje')}\` URL'yi Sorunsuz Bir Şekilde Uptime Ediyor. ✅**

**» ✅ Keevz Uptime Bot Bunlardan Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tane Senin URl'ni Uptime ediyor!📣 **
`)
  message.channel.send(say)
  }

  if(Split[0] == prefix+'yardım') {//PARADOX-DEVELOPMENT
  const pxd = new Discord.MessageEmbed()
  .setColor('RANDOM')//PARADOX-DEVELOPMENT
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()//PARADOX-DEVELOPMENT
  .setAuthor(client.user.username,client.user.avatarURL)
  .setDescription(`


`)
  .addField('**» Uptime Bot Komutları**',`
» **!ekle (Glitch Show Link)** = Botunuzu Uptime Eder.
» **!linkler** = Uptime ettiğiniz linkleri gösterir.
» **!say** = Tüm Uptime edilmiş bot sayısını gösterir.
`)
  .addField('**Uptime Bot - Hakkında**',`
» **Prefixim** = **${prefix}**
» [Destek Sunucu](https://discord.gg/vnUCR2s6nJ)
» [Uptime Bot Ekle](https://discord.com/api/oauth2/authorize?client_id=815934810325385217&permissions=8&scope=bot)
» Yapımcım = <@718116721625661542>
**NOT: Bota Dmden yazın!**`)

  message.channel.send(pxd)
  }
//PARADOX-DEVELOPMENT
    if(Split[0] == prefix+'linkler') {
    const Linkleri = db.fetch(`Projesi_${message.author.id}`)
    if (!db.get('Linkler').map(Revenge => Revenge.owner).includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setColor('#20aaba').setDescription(`**Hiç link eklememişsin. Link Eklemek İçin \`${prefix}ekle\` yazman yeterli**`))
    message.channel.send(new Discord.MessageEmbed().setColor('#20aaba').setDescription(`**Uptime ettiğiniz botlarınızın linklerini güvenlik amaçlı DM yoluyla gönderdik ${message.author}**`).setThumbnail(message.author.avatarURL))
    message.author.send(new Discord.MessageEmbed().setColor('#20aaba').setDescription(`**» Normal Linklerin:** \n\n\``+Linkleri.join('\n')+`\``).setThumbnail(message.author.avatarURL))
    }


   //PARADOX-DEVELOPMENT
})
//PARADOX-DEVELOPMENT


//PARADOX-DEVELOPMENT
client.on('ready', () => {
client.user.setActivity(`${prefix}ekle | ${prefix}yardım`, { type: 'LISTENING' })
client.user.setStatus('online')
  
  //client.user.setStatus('online') -> çevrimiçi -> PARADOX DEVELOPMENT
  //client.user.setStatus('dnd') -> rahatsız etmeyin -> PARADOX DEVELOPMENT
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
//tokenininizi giriniz.
client.login(process.env.token);


client.on("ready", () => {
  client.channels.cache.get("816298059238735882").join();
})


