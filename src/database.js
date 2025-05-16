const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

// Determinar o ambiente atual (default: development)
// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV || 'development';

// Carregar as configurações do ambiente atual
const dbConfig = config[env];

// Inicializar o Sequelize com as configurações carregadas
const sequelize = new Sequelize(
  dbConfig.database, // Nome do banco de dados
  dbConfig.username, // Usuário do banco
  dbConfig.password, // Senha do banco
  {
    host: dbConfig.host, // Host do banco de dados
    dialect: dbConfig.dialect, // Dialeto (mysql)
    port: dbConfig.port, // Porta do banco de dados
    logging: dbConfig.logging || false, // Desabilitar logs do Sequelize (opcional)
  }
);

module.exports = sequelize;