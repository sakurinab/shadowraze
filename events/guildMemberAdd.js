const Discord = require("discord.js")
const User = require("../data/user.js")
const colors = require("../settings/colors.js")
const cfg = require("../settings/config")

module.exports = async (bot, member) => {
    let res = await User.findOne({userID: member.id})
    if(!res) {
        res = new User({userID: member.id})
    }
    if (member.user.createdTimestamp > Date.now() - (1000 * 60 * 60 * 24 * 31)) {
        member.kick()
    }
    let embed = new Discord.MessageEmbed()
    .setColor(colors.default)
    .setTitle('⸝⸝ ♡₊˚ Встречаем нового участника!◞')
    .setDescription(`Привет, ${member.user.username}. Добро пожаловать в наше коммьюнити. Чувствуй себя как дома! Чтобы было легче ориентироваться, прочти [правила](https://discord.gg/2nNbJPf8Z2) и [информацию](https://discord.gg/eKQXEsKCp2) `)
    .setFooter(`${member.user.username}`, `${member.user.displayAvatarURL({format: "png", dynamic: true, size: 1024})}`)
    .setThumbnail(`${member.user.displayAvatarURL({format: "png", dynamic: true, size: 1024})}`)
    .setTimestamp();

    let channel = bot.guilds.cache.get(cfg.mainGuild).channels.cache.get(cfg.welcomeChannel);
    if(channel) return channel.send(embed)
} 