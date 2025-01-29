const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'panel',
  description: 'Create a ticket panel for users to open new tickets',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('You do not have permission to use this command.');
    }

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Ticket Panel')
      .setDescription('Click the button below to open a new ticket.')
      .setTimestamp();

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('create_ticket')
        .setLabel('Open Ticket')
        .setStyle('PRIMARY')
    );

    await message.channel.send({ embeds: [embed], components: [row] });

    const filter = (interaction) => interaction.customId === 'create_ticket' && !interaction.user.bot;
    const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (interaction) => {
      const ticketChannel = await message.guild.channels.create(`ticket-${interaction.user.username}`, {
        type: 'GUILD_TEXT',
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: interaction.user.id,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
          },
        ],
      });

      const ticketEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Ticket Created')
        .setDescription(`Your ticket has been created: ${ticketChannel}`)
        .setTimestamp();

      await interaction.reply({ embeds: [ticketEmbed], ephemeral: true });
    });

    collector.on('end', (collected) => {
      console.log(`Collected ${collected.size} interactions.`);
    });
  },
};
