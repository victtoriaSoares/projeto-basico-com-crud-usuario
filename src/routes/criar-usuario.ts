import adaptRoute from "../adapters/express-route-adapter";
import { Router } from "express";
import CriarUsuarioController from "../controllers/usuario/criar-usuario";

export default (router: Router): void => {
  /**
   * @swagger
   * components:
   *   securitySchemes:
   *     bearerAuth:
   *       type: http
   *       scheme: bearer
   *       bearerFormat: JWT
   */

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
   *   name: Users
   *   description: Gerenciamento de usuários API
   */

  /**
   * @swagger
   * /api/users:
   *   post:
   *     summary: Cria um novo usuário
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
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
  router.post("/users", adaptRoute(new CriarUsuarioController()));
};
