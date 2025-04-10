module.exports = {
  env: {
    browser: false,
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // Adicione regras personalizadas aqui, se necessário
    'no-console': 'off', // Permitir console.log
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Avisar sobre variáveis não usadas
  },
};
