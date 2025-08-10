import { Router } from "express";
import adaptRoute from "../../adapters/express-route-adapter";
import authMiddleware from "../../middlewares/auth-middleware";
import EditarUsuarioController from "../../controllers/usuario/editar-usuario";

export default (router: Router): void => {
  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     summary: Atualiza o usuário por id
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
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
  router.put(
    "/users/:id",
    authMiddleware,
    adaptRoute(new EditarUsuarioController())
  );
};
