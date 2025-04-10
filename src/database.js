const { Sequelize } = require('sequelize');
const path = require('path');
const config = require('../config/config.json');

// Determinar o ambiente atual (default: development)
// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV || 'development';

// Carregar as configurações do ambiente atual
const dbConfig = config[env];

/* eslint-disable no-undef */
// Ajustar o caminho do arquivo SQLite (se necessário)
if (dbConfig.dialect === 'sqlite' && dbConfig.storage) {
  dbConfig.storage = path.join(__dirname, dbConfig.storage);
}

// Inicializar o Sequelize com as configurações carregadas
const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;
