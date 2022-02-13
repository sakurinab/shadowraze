const { Client, Message, MessageEmbed } = require("discord.js");
const User = require("../../data/user.js");
const colors = require("../../settings/colors")
const getMember = require("../../functions/getMember")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
*/

module.exports.run = async (bot, message, args) => {
    let memb = getMember(message, args[0])
    if(!memb) memb = message.member

    User.findOne({userID: memb.id}, (err, res) => {
        if(err) throw err;
        if(res) {
            let embed = new MessageEmbed()
            .setColor(colors.default)
            .setThumbnail(memb.user.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
            .setTitle(` Инвентарь пользователя ${memb.user.tag}`)
            .addField(`Предмет:`, `> Личная роль на 1 день\n> Личная роль на 3 дня\n> Личная роль на 7 дней\n> Absolute статус на 7 дней\n> Личная комната на 7 дней`, true)
            .addField(`Количество:`, `${res.role1dSize}\n${res.role3dSize}\n${res.role7dSize}\n${res.primeSize}\n${res.channel7dSize}`, true)
            return message.channel.send(embed);
        };
    });
};