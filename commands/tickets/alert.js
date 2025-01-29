const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'alert',
  description: 'Send an alert to ticket participants',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('You do not have permission to use this command.');
    }

    const alertMessage = args.join(' ');
    if (!alertMessage) {
      return message.reply('Please provide a message to send as an alert.');
    }

    const channel = message.channel;
    if (!channel.name.startsWith('ticket-')) {
      return message.reply('This command can only be used in ticket channels.');
    }

    try {
      const embed = new MessageEmbed()
        .setColor('#FFA500')
        .setTitle('Alert')
        .setDescription(alertMessage)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('There was an error sending the alert.');
    }
  },
};
