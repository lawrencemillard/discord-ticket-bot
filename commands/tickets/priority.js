const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'priority',
  description: 'Set the priority of a ticket',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('You do not have permission to use this command.');
    }

    const priority = args[0];
    if (!priority || !['low', 'medium', 'high'].includes(priority.toLowerCase())) {
      return message.reply('Please specify a valid priority: low, medium, or high.');
    }

    const channel = message.channel;
    if (!channel.name.startsWith('ticket-')) {
      return message.reply('This command can only be used in ticket channels.');
    }

    try {
      const embed = new MessageEmbed()
        .setColor('#FFA500')
        .setTitle('Ticket Priority Updated')
        .setDescription(`The priority of this ticket has been set to ${priority}.`)
        .setTimestamp();

      await channel.setTopic(`Priority: ${priority}`);
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('There was an error setting the priority of the ticket.');
    }
  },
};
