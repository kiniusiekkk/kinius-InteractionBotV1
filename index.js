
const Discord = require('discord.js');
const client = new Discord.Client();
client.login("ZMIEN TOKEN") // wpisz se swoj token
client.on('ready', ()=> {
  console.log('Działam bezpiecznie ;]')
  client.user.setActivity('Kinius robi cos na GH', {type:'LISTENING'}) 
})


// ANTYLINK
// Wszystko jest zrobione w zależności od czego podpisze pod KATEGORIE, KANAŁ lub ROLE poniżej masz przykładową konfiguracje.

// const rola = ['1067218810098155560', '1067218810098155560', '1067218810098155560']; 
// const kategoria = ['1067218810098155560', '1067218810098155560', '1067218810098155560']; 
// const kanaly = ['1067218810098155560', '1067218810098155560', '1067218810098155560']; 

const rola = ['1067218810098155560']; 
const kategoria = ["1176614271740817454"];
const kanaly = ['1121881107235876924']
client.on('message', message => {
  if (kiniusWgazieoDrugiejWnocy(message.content)) {
    if (!message.member.roles.cache.has(rola)) {
      if (!kategoria.includes(message.channel.parentID)) {
        if(!kanaly.includes(message.channel.id)) {        message.delete().then(() => {
            const embed = new Discord.MessageEmbed()
            .setColor('#6600ff')
            .setTimestamp()
            .setDescription(`Linki są zabronione na tym serwerze.`)
          message.reply(embed).then(msg => { msg.delete({timeout:5000})});
        })
      }
    }
  }
}

});

function kiniusWgazieoDrugiejWnocy(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}


// WELCOMER
// Przy wchodzeniu/wychodzeniu wiadomosc

const kanalWELCOME = "ID KANALU DO POCZEKALNI"
const kanalLEAVE = "ID KANALU DO WYCHODZENIA"
const rolaWCHODZENIE = "ROLA KTORA MA PRZY WEJSCIU ZOSTAC DODANA"

client.on('guildMemberAdd', function(member) {
   const embed = new Discord.MessageEmbed()
  .setAuthor(`${member.user.tag}`)
  .setDescription(`Witamy na serwerze ***DevilHub***! Cieszymy się że z nami jesteś, mamy nadzieję że zostaniesz z nami na dłużej!\n> Jesteś \`${member.guild.members.cache.size}\` obywatelem/obywatelką`)
  .setColor('#6600ff')
  .setFooter('Dzięki że jestes!')
  .setTimestamp()
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
  client.channels.cache.get(`${kanalWELCOME}`).send(`<@${member.id}>`, embed)
  // jeżeli chcesz żeby jakąś role możesz odznaczyc tą linijke
  member.roles.add(`${rolaWCHODZENIE}`)
})

client.on('guildMemberRemove', function(member) {
  const embed = new Discord.MessageEmbed()
 .setAuthor(`${member.user.tag}`)
 .setDescription(`Żegnaj! Szkoda że nasz opuszczasz! Liczymi że się kiedyś zobaczymy!\n> Jesteś \`${member.guild.members.cache.size}\` obywatelem/obywatelką`)
 .setColor('FF0000')
 .setFooter('Szkoda że nas Opuszczasz!')
 .setTimestamp()
 .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
 client.channels.cache.get(`${kanalLEAVE}`).send(`<@${member.id}>`, embed)
})


// INTERAKCJE  (przyklad to propozycje)
// Polega na tym że bot podmienia wiadomosc i podmienia reakcje

client.on('message', async message => {
  let serverName = "DevilHub"
   if(message.author.bot) return;
   if(message.channel.id === "1068614068274987038") {
           const kinius = new Discord.MessageEmbed()
               .setDescription("**" + message.content + "**")
               .setColor('#6600ff')
               .setAuthor('Propozycja')
               .setFooter(serverName + " ■ Autor: " + message.author.tag);
           let a = message.reply(kinius).then(msg => {
               msg.react('✅');
               msg.react('❎');
           })
           await message.delete();
       }
 });
