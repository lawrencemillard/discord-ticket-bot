const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'close',
  description: 'Close a ticket',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('You do not have permission to use this command.');
    }

    const channel = message.channel;
    if (!channel.name.startsWith('ticket-')) {
      return message.reply('This command can only be used in ticket channels.');
    }

    try {
      await channel.delete();

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Ticket Closed')
        .setDescription('The ticket has been closed and the channel has been deleted.')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('There was an error closing the ticket.');
    }
  },
};
