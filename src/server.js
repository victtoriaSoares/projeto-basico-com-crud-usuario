// Bibliotecas
const express = require('express');
const prompt = require('prompt');
const fs = require('fs');
const path = require('path');
const { swaggerUi, specs } = require('./swaggerConfig'); // Importar configuração do Swagger

// Middlewares
const middlewares = require('./middlewares');

// Cria o servidor express
const app = express();
const initialPort = 3000;

// Configura o Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(middlewares.cors);
app.use(middlewares.contentType);
app.use(middlewares.bodyParser);

// Carregar dinamicamente todas as rotas na pasta 'routes'
fs.readdirSync(path.join(__dirname, 'routes')).forEach(file => {
    const route = require(`./routes/${file}`);
    app.use('/api', route);
});

// Função para iniciar o servidor em uma porta específica
const startServer = (port) => {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
        console.log(`Documentação da API disponível em http://localhost:${port}/api-docs`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Porta ${port} está ocupada.`);
            const newPort = port + 1;
            promptUserForNewPort(newPort);
        } else {
            console.error(err);
        }
    });
};

// Função para perguntar ao usuário se deseja usar a nova porta
const promptUserForNewPort = (newPort) => {
    prompt.start();
    const schema = {
        properties: {
            useNewPort: {
                description: `Porta ${newPort} está disponível. Deseja usar essa porta? (sim/não)`,
                pattern: /^(sim|não|s|n)$/i,
                message: 'Responda com "sim" ou "não"',
                required: true
            }
        }
    };

    prompt.get(schema, (err, result) => {
        if (result.useNewPort.toLowerCase() === 'sim' || result.useNewPort.toLowerCase() === 's') {
            startServer(newPort);
        } else {
            console.log('Servidor não iniciado.');
        }
    });
};

// Iniciar o servidor na porta inicial
startServer(initialPort);