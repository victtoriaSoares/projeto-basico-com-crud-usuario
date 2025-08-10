import { Router } from "express";
import adaptRoute from "../../adapters/express-route-adapter";
import authMiddleware from "../../middlewares/auth-middleware";
import ListarUsuarioController from "../../controllers/usuario/listar-usuario";

export default (router: Router): void => {
  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     summary: Retorna a lista de usuários
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: false
   *         description: The user id
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
  router.get(
    "/users{/:id}",
    authMiddleware,
    adaptRoute(new ListarUsuarioController())
  );
};
