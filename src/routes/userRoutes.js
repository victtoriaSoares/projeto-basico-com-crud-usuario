const express = require('express');
const router = express.Router();
const routeAdapter = require('../adapters/express-route-adapter');
const CriarUsuarioController = require('../controllers/criar-usuario');
const ListarUsuarioController = require('../controllers/listar-usuario');
const EditarUsuarioController = require('../controllers/editar-usuario');
const DeletarUsuarioController = require('../controllers/deletar-usuario');
const LoginController = require('../controllers/login-controller');
const adaptRoute = require('../adapters/express-route-adapter');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - nome
 *         - senha
 *         - email
 *       properties:
 *         nome:
 *           type: string
 *           description: O nome de usuário
 *         senha:
 *           type: string
 *           description: A senha do usuário
 *         email:
 *           type: string
 *           description: O email do usuário
 *       example:
 *         id: 1
 *         nome: "João da Silva"
 *         senha: "123abc"
 *         email: "joao.silva@dominio.com"
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticação
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *             example:
 *               email: "joao.silva@dominio.com"
 *               senha: "123abc"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado
 *       401:
 *         description: Credenciais inválidas
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', routeAdapter(new LoginController()));


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários API
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: O usuário foi criado com sucesso!
 *       500:
 *         description: Algum erro aconteceu
 */
router.post('/users', routeAdapter(new CriarUsuarioController()));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna a lista de usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A lista de usuários foi retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', routeAdapter(new ListarUsuarioController()));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza o usuário por id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
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
 *         description: O usuário foi atualizado com sucesso
 *       404:
 *         description: O usuário não foi encontrado
 *       500:
 *         description: Algum erro aconteceu
 */
router.put('/users/:id', adaptRoute(new EditarUsuarioController()));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove o usuário por id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O id do usuário
 *     responses:
 *       200:
 *         description: O usuário foi removido com sucesso
 *       404:
 *         description: O usuário não foi encontrado
 *       500:
 *         description: Algum erro aconteceu
 */
router.delete('/users/:id', adaptRoute(new DeletarUsuarioController()));

module.exports = router;