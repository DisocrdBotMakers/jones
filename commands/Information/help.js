const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "help",
    category: "Information",
    aliases: ["h", "halp"],
    cooldown: 4,
    usage: "help",
    description: "Shows you Help for promusic",
    run: async (client, message, args, user, text, prefix) => {
      try {
        let string = `:white_check_mark: Type \`${prefix}commands\` for a list of Commands\n\n:question: New to **promusic**? Check out our [FAQ](https://example.com/faq/)\n\n:page_facing_up: Still need help? [Click here to join our Discord server](https://discord.gg/v8a9WmE7j7)`
        let embed = new MessageEmbed()
        .setTitle("promusic Help")
        .setURL("https://discord.gg/v8a9WmE7j7")
        .setDescription(string);
        if (message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) {
          message.reply(embed);
        } else {
          message.reply(string);
        }
      } catch (e) {
        console.log(String(e.stack).bgRed);
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
      }
    }
};
