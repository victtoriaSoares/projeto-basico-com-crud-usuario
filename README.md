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
### Passo 3: Criação dos middlewares

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

#### Implementando os middlewares no código do servidor
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

### Passo 4: Criação de função que busca outra opção de porta caso a selecionada não esteja disponível

1. **Instale a biblioteca prompt:**
```bash
    npm install prompt
```
2. **Altere o arquivo chamado `server.js`** e adicione o seguinte código:
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

### Passo 5: Criação de rotas para carregamento dinãmico

1. **Crie um arquivo chamado `userRoutes.js` na pasta routes** e adicione o seguinte código:
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
2. **Altere o arquivo chamado `server.js`** e adicione o seguinte código:

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
### Passo 6: Criação de arquivo index para centralizar importação de módulos

1. **Crie um arquivo chamado `index.js` na pasta middlewares** e adicione o seguinte código:
```javascript
module.exports = {
    bodyParser: require('./body-parser'),
    contentType: require('./content-type'),
    cors: require('./cors')
};
```
2. **Altere o arquivo chamado `server.js`** e adicione o seguinte código:
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
### Passo 7: Criação da documentação do swagger

1. **Instale as dependências necessárias**:
   ```bash
   npm install swagger-ui-express swagger-jsdoc
   ```

2. **crie um arquivo chamado `swaggerConfig.js` na pasta src** e adicione o seguinte código:

```javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'API para gerenciamento de usuários',
        },
    },
    apis: ['./src/routes/*.js'], // Caminho para os arquivos de rotas
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};
```
3. **Altere o arquivo chamado `serger.js` na pasta src** e adicione o seguinte código:

```javascript
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
```
4. **Altere o arquivo chamado `userRoutes.js` na pasta routes** e adicione o seguinte código:

```javascript
const express = require('express');
const router = express.Router();

let users = [];

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *       example:
 *         id: d5fE_asz
 *         name: John Doe
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send('Usuário criado com sucesso!');
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', (req, res) => {
    res.json(users);
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update the user by the id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some error happened
 */
router.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    users = users.map(user => user.id === id ? updatedUser : user);
    res.send('Usuário atualizado com sucesso!');
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
router.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    users = users.filter(user => user.id !== id);
    res.send('Usuário deletado com sucesso!');
});

module.exports = router;
```

```bash
npm install sqlite3 sequelize
```

```javascript
// filepath: /home/professor/Projetos/user-api-v2/src/database.js
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite')
});

module.exports = sequelize;
```

```javascript
// filepath: /home/professor/Projetos/user-api-v2/src/models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
```

```javascript
...
const sequelize = require('./database'); // Importar a configuração do banco de dados
const User = require('./models/userModel'); // Importar o modelo de usuário
...

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado');
    startServer(initialPort);
}).catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
});
...
```

```javascript
// filepath: /home/professor/Projetos/user-api-v2/src/routes/userRoutes.js
const express = require('express');
const User = require('../models/userModel');
const router = express.Router();

router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
```