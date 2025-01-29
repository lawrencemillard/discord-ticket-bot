const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'rename',
  description: 'Rename a ticket',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('You do not have permission to use this command.');
    }

    const newName = args.join(' ');
    if (!newName) {
      return message.reply('Please provide a new name for the ticket.');
    }

    const channel = message.channel;
    if (!channel.name.startsWith('ticket-')) {
      return message.reply('This command can only be used in ticket channels.');
    }

    try {
      await channel.setName(`ticket-${newName}`);

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Ticket Renamed')
        .setDescription(`The ticket has been renamed to: ${newName}`)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('There was an error renaming the ticket.');
    }
  },
};
