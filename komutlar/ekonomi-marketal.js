const Discord = require('discord.js');
const db = require('quick.db')
const kasalar = require('.././kasalar');
exports.run = async (client, message, args) => {
  const kasaid = args[0];
  const bakiye = await db.fetch(`bakiyecdare-${message.author.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumcodare-${message.author.id}`);
  const kasasayisi = kasalar.length
  if(!hesapdurumu) return message.reply(`İlk olarak hesap oluşturmalısın. ${client.ekoayarlar.botunuzunprefixi}hesap-oluştur <Hesap İsmi>`)
  const kasaidembeds = new Discord.MessageEmbed()
  .setTitle(`Bir market İD si girmelisin!`)
  .setFooter(`Ürün listesine bakmak için: ${client.ekoayarlar.botunuzunprefixi}market`)
  .setColor(client.ekoayarlar.renk)
  if(!kasaid) return message.channel.send(kasaidembeds)
  if(kasaid > kasasayisi) return message.channel.send(kasaidembeds)
  if(isNaN(kasaid)) return message.channel.send(kasaidembeds)
  const kasafiyat = kasalar.filter(x => x.kasaid == kasaid).map(x => x.fiyat)
  if(bakiye < kasafiyat) return message.channel.send(`:warning: Paranız Yetersiz!`)
  message.channel.send(`Ürünü almak istediğinize emin misiniz?\n Şu anda \`${bakiye} ${client.ekoayarlar.parabirimi}\` paran var kasayı açtıktan sonra \`${bakiye - kasafiyat}\` paran kalacak. \n\`Eğer açmak istiyorsan evet(e) istemiyorsan hayır(h) yazabilirsin.\``)
  
  
  let uwu = false;
  while (!uwu) {
    const response = await message.channel.awaitMessages(neblm => neblm.author.id === message.author.id, { max: 1, time: 30000 });
    const choice = response.first().content
    if (choice == 'hayır' || choice == 'h') return message.channel.send('🚀 İşlem iptal edildi.')
    if (choice !== 'evet' && choice !== 'e') {
      message.channel.send('❓ Lütfen sadece **evet (e)** veya **hayır (h)** ile cevap verin.')
    }
    if (choice == 'evet' || choice == 'e') uwu = true
  }
  if (uwu) {
    try {
      db.add(`bakiyecdare-${message.author.id}`, -kasafiyat)
      message.channel.send("Ürün alınıyor.").then(async msg => {
        const icindekiler = require(`.././kasa${kasaid}`)
        setTimeout(() => {
          msg.edit("Ürün alınıyor..");
        }, 1000);
        setTimeout(() => {
          msg.edit("Ürün alınıyor...");
        }, 2000);
        setTimeout(() => {
          msg.edit("Ürün alınıyor..");
        }, 3000);
        setTimeout(() => {
          msg.edit("Ürün alınıyor.");
        }, 4000);
        setTimeout(() => {
          msg.edit("Ürün alındı!");
          msg.delete()
        }, 5000);
        setTimeout(() => {
          const icindeki = icindekiler[Math.floor(Math.random() * icindekiler.length)];
          message.channel.send(`Kasadan \`${icindeki}\` ${client.ekoayarlar.parabirimi} kazandın!`)
          db.add(`bakiyecdare-${message.author.id}`, icindeki)
        }, 7800)
      })
      //const activity = activitys[Math.floor(Math.random() * activitys.length)];
      } catch(e) {
        message.channel.send(':warning: Bir hata var!')
      }
  }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['marketal'],
    permLevel: 0,
    katagori: "Ekonomi"
}

exports.help = {
    name: 'market-al',
    description: 'Belirttiğiniz İD deki kasayı açarsınız.',
    usage: 'kasa-aç <Kasa-İD>'
}