import { ListarPratoController } from "../../controllers/prato/listar-prato";
import { Router } from "express";
import adaptRoute from "../../adapters/express-route-adapter";
import authMiddleware from "../../middlewares/auth-middleware";

export default (router: Router): void => {
  /**
   * @swagger
   * /api/pratos/{id}:
   *   get:
   *     summary: Retorna um único prato
   *     tags: [Pratos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: false
   *         description: The prato id
   *     responses:
   *       200:
   *         description: Um prato retornado pelo seu ID
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Prato'
   */
  router.get(
    "/pratos{/:id}",
    authMiddleware,
    adaptRoute(new ListarPratoController())
  );
};
