import { Router } from "express";
import authMiddleware from "../../middlewares/auth-middleware";
import DeletarUsuarioController from "../../controllers/usuario/deletar-usuario";
import adaptRoute from "../../adapters/express-route-adapter";
export default (router: Router): void => {
  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     summary: Remove o usuário por id
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
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
  router.delete(
    "/users/:id",
    authMiddleware,
    adaptRoute(new DeletarUsuarioController())
  );
};
