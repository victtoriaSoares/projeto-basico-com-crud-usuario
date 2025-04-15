const User = require('../models/user-model');
const jwt = require('jsonwebtoken');

class RefreshTokenController {
  /**
   * @param {HttpRequest} httpRequest - Objeto da requisição HTTP
   * @returns {Promise<HttpResponse>}
   */
  async handle(httpRequest) {
    try {
      const { refreshToken } = httpRequest.body;

      if (!refreshToken) {
        return {
          statusCode: 400,
          body: { message: 'Refresh token é obrigatório' },
        };
      }

      // Verifique o refresh token
      // eslint-disable-next-line no-undef
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      // Opcional: Verifique se o refresh token ainda é válido no banco de dados
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return {
          statusCode: 403,
          body: { message: 'Refresh token inválido' },
        };
      }

      // Gere um novo access token
      const newAccessToken = jwt.sign(
        { id: user.id, email: user.email },
        // eslint-disable-next-line no-undef
        process.env.JWT_SECRET,
        // eslint-disable-next-line no-undef
        { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
      );

      return {
        statusCode: 200,
        body: { token: newAccessToken },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { message: 'Erro interno do servidor', error: error.message },
      };
    }
  }
}

module.exports = RefreshTokenController;
