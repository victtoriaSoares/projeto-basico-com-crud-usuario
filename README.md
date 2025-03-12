### Passo 1: Configuração do Projeto

1. **Crie uma pasta para o projeto** e navegue até ela no terminal:
   ```bash
   mkdir user-api
   cd user-api
   ```

1. **Crie a seguinte estrutura de pastas e arquivos**:
   ```
   user-api/
   ├── node_modules/
   ├── src/
   │   └── middlewares/
   │        └── cors.js
   │        └── content-type.js
   │        └── body-parser.js
   │        └── index.js
   │   └── routes/
   │        └── userRoutes.js
   │   └── server.js
   ├── package.json
   └── package-lock.json
   ```

2. **Inicialize um novo projeto Node.js**:
   ### Se tiver usando npm

   ```bash
   npm init -y
   ```
   ### Se tiver usando yarn
   
   ```bash
   yarn init -y
   ```

3. **Instale as dependências necessárias**:
   ```bash
   npm install express
   ```

### Passo 2: Criação do Servidor Express

1. **Crie um arquivo chamado `server.js`** e adicione o seguinte código:
   ```javascript
   const express = require('express');

   const app = express();
   const port = 3000;

   let users = [];

   // Endpoint para criação de usuário
   app.post('/users', (req, res) => {
       const user = req.body;
       users.push(user);
       res.status(201).send('Usuário criado com sucesso!');
   });

   // Endpoint para listagem de usuários
   app.get('/users', (req, res) => {
       res.json(users);
   });

   // Endpoint para atualização de usuário
   app.put('/users/:id', (req, res) => {
       const id = req.params.id;
       const updatedUser = req.body;
       users = users.map(user => user.id === id ? updatedUser : user);
       res.send('Usuário atualizado com sucesso!');
   });

   // Endpoint para deletar usuário
   app.delete('/users/:id', (req, res) => {
       const id = req.params.id;
       users = users.filter(user => user.id !== id);
       res.send('Usuário deletado com sucesso!');
   });

   app.listen(port, () => {
       console.log(`Servidor rodando na porta ${port}`);
   });
   ```
### Passo 3: Criação do Servidor Express
1. **Crie um arquivo chamado `cors.js`** e adicione o seguinte código:
```javascript
const cors = (req, res, next) => {
    res.set('access-control-allow-origin', '*');
    res.set('access-control-allow-headers', '*');
    res.set('access-control-allow-methods', '*');
    next();
}

module.exports = cors;
```

2. **Crie um arquivo chamado `body-parser.js`** e adicione o seguinte código:
```javascript
const { json } = require('express');

const bodyParser = json();

module.exports = bodyParser;
```

3. **Crie um arquivo chamado `content-type.js`** e adicione o seguinte código:
```javascript
const contentType = (req, res, next) => {
    res.type('json');
    next();
};

module.exports = contentType;
```
```javascript
    const express = require('express');
    const cors = require('./middlewares/cors');
    const contentType = require('./middlewares/content-type');
    const bodyParser = require('./middlewares/body-parser');

    const app = express();
    const port = 3000;

    app.use(cors)
    app.use(contentType)
    app.use(bodyParser)

    let users = [];

    // Endpoint para criação de usuário
    app.post('/users', (req, res) => {
        const user = req.body;
        users.push(user);
        res.status(201).send('Usuário criado com sucesso!');
    });

    // Endpoint para listagem de usuários
    app.get('/users', (req, res) => {
        res.json(users);
    });

    // Endpoint para atualização de usuário
    app.put('/users/:id', (req, res) => {
        const id = req.params.id;
        const updatedUser = req.body;
        users = users.map(user => user.id === id ? updatedUser : user);
        res.send('Usuário atualizado com sucesso!');
    });

    // Endpoint para deletar usuário
    app.delete('/users/:id', (req, res) => {
        const id = req.params.id;
        users = users.filter(user => user.id !== id);
        res.send('Usuário deletado com sucesso!');
    });

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
```

```bash
    npm install prompt
```

```javascript
    const express = require('express');
    const cors = require('./middlewares/cors');
    const contentType = require('./middlewares/content-type');
    const bodyParser = require('./middlewares/body-parser');

    const app = express();
    const port = 3000;

    app.use(cors)
    app.use(contentType)
    app.use(bodyParser)

    let users = [];

    // Endpoint para criação de usuário
    app.post('/users', (req, res) => {
        const user = req.body;
        users.push(user);
        res.status(201).send('Usuário criado com sucesso!');
    });

    // Endpoint para listagem de usuários
    app.get('/users', (req, res) => {
        res.json(users);
    });

    // Endpoint para atualização de usuário
    app.put('/users/:id', (req, res) => {
        const id = req.params.id;
        const updatedUser = req.body;
        users = users.map(user => user.id === id ? updatedUser : user);
        res.send('Usuário atualizado com sucesso!');
    });

    // Endpoint para deletar usuário
    app.delete('/users/:id', (req, res) => {
        const id = req.params.id;
        users = users.filter(user => user.id !== id);
        res.send('Usuário deletado com sucesso!');
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
```

```bash
    mkdir routes
```
**Crie um arquivo chamado `userRoutes.js`** e adicione o seguinte código:
```javascript
    const express = require('express');
    const router = express.Router();

    let users = [];

    // Endpoint para criação de usuário
    router.post('/users', (req, res) => {
        const user = req.body;
        users.push(user);
        res.status(201).send('Usuário criado com sucesso!');
    });

    // Endpoint para listagem de usuários
    router.get('/users', (req, res) => {
        res.json(users);
    });

    // Endpoint para atualização de usuário
    router.put('/users/:id', (req, res) => {
        const id = req.params.id;
        const updatedUser = req.body;
        users = users.map(user => user.id === id ? updatedUser : user);
        res.send('Usuário atualizado com sucesso!');
    });

    // Endpoint para deletar usuário
    router.delete('/users/:id', (req, res) => {
        const id = req.params.id;
        users = users.filter(user => user.id !== id);
        res.send('Usuário deletado com sucesso!');
    });

    module.exports = router;
```

```javascript
    // Bibliotecas
    const express = require('express');
    const prompt = require('prompt');
    const fs = require('fs');
    const path = require('path');

    // Middlewares
    const cors = require('./middlewares/cors');
    const contentType = require('./middlewares/content-type');
    const bodyParser = require('./middlewares/body-parser');

    const app = express();
    const port = 3000;

    app.use(cors)
    app.use(contentType)
    app.use(bodyParser)

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
```

**Crie um arquivo chamado `index.js`** dentro da pasta middlewares e adicione o seguinte código:
```javascript
module.exports = {
    bodyParser: require('./body-parser'),
    contentType: require('./content-type'),
    cors: require('./cors')
};
```

```javascript
    // Bibliotecas
    const express = require('express');
    const prompt = require('prompt');
    const fs = require('fs');
    const path = require('path');

    // Middlewares
    const middlewares = require('./middlewares');

    const app = express();
    const port = 3000;

    app.use(middlewares.cors)
    app.use(middlewares.contentType)
    app.use(middlewares.bodyParser)

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
```