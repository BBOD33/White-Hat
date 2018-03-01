const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");

client.commands = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  if(err) console.log(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
    console.log("Yüklenecek komut bulunamadı!");
    return;
  }
  console.log(`${jsfiles.length} adet komut yüklendi!`)

  jsfiles.forEach((f, i) => {
    let props = require(`./komutlar/${f}`);
    console.log(`${i + 1}: ${f} yüklendi!`)
    client.commands.set(props.help.name, props);
  });
});

var rr = ((1 << 24) * Math.random() | 0).toString(16);
var prefix = ayarlar.prefix;

client.on('ready', () => {
  console.log(`Giriş Yaptı ${client.user.tag}!`);
  client.user.setStatus("idle");
      client.user.setActivity("Yükleniyor.");
      setTimeout(() => {
        client.user.setActivity("Yükleniyor..");
        setTimeout(() => {
          client.user.setActivity("Yükleniyor...");
          setTimeout(() => {
          client.user.setActivity("wh!yardım | White Hat");
          client.user.setS("online");
        }, 2500);
      }, 2500);
    }, 2500);
});

function loadCmds () {
    fs.readdir("./komutlar/", (err, files) => {
      if(err) console.log(err);

      let jsfiles = files.filter(f => f.split(".").pop() === "js");
      if(jsfiles.length <= 0) {
        console.log("Yüklenecek komut bulunamadı!");
        return;
      }
      console.log(`${jsfiles.length} adet komut yüklendi!`)
      var kog = (jsfiles.length);

      jsfiles.forEach((f, i) => {
        delete require.cache[require.resolve(`./komutlar/${f}`)];
        let props = require(`./komutlar/${f}`);
        console.log(`${i + 1}: ${f} yüklendi!`)
        client.commands.set(props.help.name, props);
      });
});
}

client.on("message", async message => {
  const whitevet = client.emojis.find("name", "whitehatevet");
  let cont = message.content.split(" ");
  let komut = cont[0];
  let args = cont.slice(1);

  if(komut === prefix + "reload") {
    var kog = 0;
    fs.readdir("./komutlar/", (err, files) => {
      if(err) console.log(err);

      let jsfiles = files.filter(f => f.split(".").pop() === "js");
      message.channel.send(`\`${jsfiles.length}\` adet komut yüklendi ${whitevet}`);
    });
    loadCmds();
  }
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray= message.content.split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if(!command.startsWith(prefix)) return;

  let cmd = client.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(client, message, args, prefix);
})

client.on('guildMemberAdd', member => {
  const embed = new Discord.RichEmbed()
  .setAuthor(client.user.username, client.user.displayAvatarURL)
  .setThumbnail("http://i0.wp.com/kayastore.esy.es/wp-content/uploads/2016/04/hosgeldiniz.png?resize=600%2C267")
  .setDescription(`:inbox_tray:| **White Hat Sunucusuna Hoşgeldin Nerelerdeydin Sen ${member.user.username}`)
  .setFooter(member.guild.name, member.guild.iconURL)
  .setColor(rr)
  member.send(embed);
});

client.login(ayarlar.token);