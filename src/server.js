const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./middlewares/cors');
const fs = require('fs');
const path = require('path');
const prompt = require('prompt');
const logger = require('./middlewares/logger');
const { swaggerUi, specs } = require('./swaggerConfig'); // Importar configuração do Swagger
const app = express();
const initialPort = 3000;

app.use(bodyParser.json());
app.use(cors);
app.use(logger);

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Carregar dinamicamente todas as rotas na pasta 'routes'
fs.readdirSync(path.join(__dirname, 'routes')).forEach(file => {
    const route = require(`./routes/${file}`);
    app.use('/api', route);
});

// Função para iniciar o servidor em uma porta específica
const startServer = (port) => {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
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