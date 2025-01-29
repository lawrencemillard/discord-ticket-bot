const { MessageEmbed } = require('discord.js');

function createEmbed(title, description, color, thumbnail, image, fields, footer) {
  const embed = new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setThumbnail(thumbnail)
    .setImage(image)
    .setFooter(footer);

  if (fields) {
    fields.forEach(field => {
      embed.addField(field.name, field.value, field.inline);
    });
  }

  return embed;
}

module.exports = {
  createEmbed,
};
