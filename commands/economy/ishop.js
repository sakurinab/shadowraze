const { Client, Message, MessageEmbed } = require("discord.js");
const shop = require("../../settings/ishop.json");

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
*/

module.exports.run = async (bot, message, args) => {
    let embed = new MessageEmbed();
    let numbers = {
        0: "<:S_1:942084483765637220>",
        1: "<:S_1:942084483765637220>",
        2: "<:S_2:942084483664998450> ",
        3: "<:S_3:942084483774025778>",
        4: "<:S_4:942084483694338068>",
        5: "<:S_5:942084483220377610>",
        6: "<:S_6:942084483383971841>",
        7: "<:S_7:942084483472056390>",
        8: "<:S_8:942084483186843648>",
        9: "<:S_9:942084483019067412>",
        10: "<:S_10:942084483648208976>"
    };
    let txt = "";
    let price = "";
    if(0 < shop.ishop.length) {
        for(let i = 0;i < shop.ishop.length;i++) {
            txt += `${numbers[i + 1]}${shop.ishop[i].object} на ${shop.ishop[i].time.replace("d", "д").replace("m", "м")}\n`;
            price += `${parseInt(shop.ishop[i].price)}${bot.values.crown}\n`;
        }
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
        .setTitle(` Магазин предметов `)
        .addField(`№ Предмет:`, txt, true)
        .addField(`Стоимость:`, price, true)
        .setImage("https://cdn.discordapp.com/attachments/852532626878103632/852532673376550962/Shop1.gif")
        .setFooter(`${bot.prefix}ibuy <номер> для покупки・${bot.prefix}money для просмотра баланса`)
        .setColor("#36393f");
        message.channel.send(embed);
    } else {
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
        .setTitle(` Магазин предметов `)
        .addField(`№ Роль:`, `${numbers[0]} Пусто`, true)
        .addField(`Стоимость:`, `0${bot.values.crown}`, true)
        .setImage("https://cdn.discordapp.com/attachments/852532626878103632/852532673376550962/Shop1.gif")
        .setFooter(`${bot.prefix}ibuy <номер> для покупки・${bot.prefix}money для просмотра баланса`)
        .setColor("#36393f");
        message.channel.send(embed);
    };
};