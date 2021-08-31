const Discord = require('discord.js');
const db = require('quick.db')
const kasalar = require('.././market');

exports.run = async (client, message, args) => {
  
  const kasalarfilter = kasalar.filter(x => x.marketid).map(x => `İşte market: **${x.ürün}** Ürün fiyatı: **${x.değer}** İD: **${x.marketid}**`).join('\n ')
  const embed = new Discord.MessageEmbed()
  .addField(`Market Listesi ${client.ekoayarlar.botismi}`, `${kasalarfilter}`)
  .setFooter(`Market hakkında bilgi almak için: ${client.ekoayarlar.botunuzunprefixi}market-bilgi <marketid>`)
  .setColor(client.ekoayarlar.renk)
  message.channel.send(embed)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    katagori: "Ekonomi"
}

exports.help = {
    name: 'market',
    description: 'Kasaları listeler.',
    usage: 'kasalar'
}