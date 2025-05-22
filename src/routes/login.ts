import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import LoginController from "../controllers/login/login";

export default (router: Router): void => {
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
   *                 refreshToken:
   *                   type: string
   *                   description: Token de atualização gerado
   *               example:
   *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
   *                 refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
   *       401:
   *         description: Credenciais inválidas
   *       404:
   *         description: Usuário não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  router.post("/login", adaptRoute(new LoginController()));
};
