const express = require('express');
const router = express.Router();
const routeAdapter = require('../adapters/express-route-adapter');
const LoginController = require('../controllers/login-controller');

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

module.exports = router;