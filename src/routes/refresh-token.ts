import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import RefreshTokenController from "../controllers/login/refresh-token";

export default (router: Router): void => {
  /**
   * @swagger
   * /api/refresh-token:
   *  post:
   *    summary: Gera um novo token de acesso
   *    tags: [Auth]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            required:
   *              - refreshToken
   *            properties:
   *              refreshToken:
   *                type: string
   *                description: Token de atualização
   *            example:
   *              refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ0NjczNzU1LCJleHAiOjE3NDUyNzg1NTV9.OfY7EqHxukKFa0rLMtAuo0TWj2DGJ3q5gd53TMd7Kvs
   *    responses:
   *      200:
   *        description: Token de acesso gerado com sucesso
   *        content:
   *          application/json:
   *            schema:
   *            type: object
   *            properties:
   *              token:
   *                type: string
   *                description: Token de acesso gerado
   *            example:
   *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ0NjczNzU1LCJleHAiOjE3NDUyNzg1NTV9.OfY7EqHxukKFa0rLMtAuo0TWj2DGJ3q5gd53TMd7Kvs
   *      400:
   *        description: Token de atualização não fornecido
   *      403:
   *        description: Token de atualização inválido
   *      500:
   *        description: Erro interno do servidor
   */
  router.post("/refresh-token", adaptRoute(new RefreshTokenController()));
};
