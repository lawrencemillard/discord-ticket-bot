const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'stats',
  description: 'Display bot statistics such as uptime, server count, and user count',
  async execute(message, args) {
    const uptime = process.uptime();
    const serverCount = message.client.guilds.cache.size;
    const userCount = message.client.users.cache.size;

    const embed = new MessageEmbed()
      .setTitle('Bot Statistics')
      .setColor('#0099ff')
      .addField('Uptime', `${Math.floor(uptime / 60)} minutes`)
      .addField('Server Count', `${serverCount}`)
      .addField('User Count', `${userCount}`)
      .setFooter('Bot Statistics');

    message.channel.send({ embeds: [embed] });
  },
};
