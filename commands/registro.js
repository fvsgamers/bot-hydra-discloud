const { 
  SlashCommandBuilder, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle 
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('registro')
    .setDescription('Abrir painel de recrutamento'),

  async execute(interaction) {

    // IDs dos cargos que PODEM usar o comando
    const cargosPermitidos = [
      '1483885950928027748',
      '1483886170495516734',
      '1485735984967716976'
    ];

    const membro = interaction.member;

    // Verifica se o usuário tem algum dos cargos
    const temPermissao = membro.roles.cache.some(role => 
      cargosPermitidos.includes(role.id)
    );

    if (!temPermissao) {
      return interaction.reply({
        content: '❌ Você não tem permissão para usar este comando.',
        ephemeral: true
      });
    }

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('abrir_formulario')
        .setLabel('📋 Fazer Registro')
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      content: 'Clique abaixo para iniciar seu recrutamento:',
      components: [button]
    });
  }
};
