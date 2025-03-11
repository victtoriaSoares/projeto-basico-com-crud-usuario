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