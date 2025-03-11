const express = require('express');
const router = express.Router();

let resources = [];

// Endpoint para criação de recurso
router.post('/resources', (req, res) => {
    const resource = req.body;
    resources.push(resource);
    res.status(201).send('Recurso criado com sucesso!');
});

// Endpoint para listagem de recursos
router.get('/resources', (req, res) => {
    res.json(resources);
});

// Endpoint para atualização de recurso
router.put('/resources/:id', (req, res) => {
    const id = req.params.id;
    const updatedResource = req.body;
    resources = resources.map(resource => resource.id === id ? updatedResource : resource);
    res.send('Recurso atualizado com sucesso!');
});

// Endpoint para deletar recurso
router.delete('/resources/:id', (req, res) => {
    const id = req.params.id;
    resources = resources.filter(resource => resource.id !== id);
    res.send('Recurso deletado com sucesso!');
});

module.exports = router;