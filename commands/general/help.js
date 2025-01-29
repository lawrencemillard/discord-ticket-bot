const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Provide a list of available commands and their descriptions',
  execute(message, args) {
    const embed = new MessageEmbed()
      .setTitle('Tickets\'s Commands List')
      .setColor('#0099ff')
      .addField('👤 | General — (4)', 'help, ping, stats')
      .addField('🎫 | Ticket — (9)', 'add, remove, panel, rename, close, pin, delete, alert, priority')
      .setFooter('Use !<command> to execute a command.');

    message.channel.send({ embeds: [embed] });
  },
};
