import adaptRoute from "../../adapters/express-route-adapter";
import { Router } from "express";
import DeletarPratoController from "../../controllers/prato/deletar-prato";
import { authMiddleware } from "../../middlewares";

export default (router: Router): void => {
  /**
   * @swagger
   * /api/pratos/{id}:
   *   delete:
   *     summary: Remove um prato pelo id
   *     tags: [Pratos]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: O id do prato
   *     responses:
   *       204:
   *         description: O prato foi removido com sucesso
   *       404:
   *         description: O prato não foi encontrado
   *       500:
   *         description: Algum erro aconteceu
   */

  router.delete(
    "/pratos/:id",
    authMiddleware,
    adaptRoute(new DeletarPratoController())
  );
};
