import { Router } from "express";
import { CriarPratoController } from "../../controllers/prato/criar-prato";
import adaptRoute from "../../adapters/express-route-adapter";
import { authMiddleware } from "../../middlewares";

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
   *     Prato:
   *       type: object
   *       required:
   *         - nome
   *         - cozinha
   *         - descricao_resumida
   *         - descricao_detalhada
   *         - valor
   *       properties:
   *         nome:
   *           type: string
   *           description: O nome do prato
   *         cozinha:
   *           type: string
   *           description: A cozinha do prato
   *         descricao_resumida:
   *           type: string
   *           description: A descrição resumida do prato
   *         descricao_detalhada:
   *           type: string
   *           description: A descrição detalhada do prato
   *         imagem:
   *           type: string
   *           description: A imagem do prato
   *         valor:
   *           type: number
   *           description: O valor do prato
   *       example:
   *           nome: "Feijoada"
   *           cozinha: "Brasileira"
   *           descricao_resumida: "Feijoada tradicional brasileira"
   *           descricao_detalhada: "Feijoada é um prato típico brasileiro, feito com feijão preto, carne de porco e acompanhamentos como arroz, farofa e couve."
   *           imagem: "https://example.com/imagem-feijoada.jpg"
   *           valor: 49.90
   */

  /**
   * @swagger
   * tags:
   *   name: Pratos
   *   description: Gerenciamento de pratos API
   */

  /**
   * @swagger
   * /api/pratos:
   *   post:
   *     summary: Cria um novo Prato
   *     tags: [Pratos]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *          schema:
   *             $ref: '#/components/schemas/Prato'
   *     responses:
   *       201:
   *         description: O prato foi criado com sucesso!
   *       500:
   *         description: Algum erro aconteceu
   */
  router.post(
    "/pratos",
    authMiddleware,
    adaptRoute(new CriarPratoController())
  );
};
