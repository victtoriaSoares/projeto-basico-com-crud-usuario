const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {
  /**
   * @param {HttpRequest} httpRequest - Objeto da requisição HTTP
   * @returns {Promise<HttpResponse>}
   */
  async handle(httpRequest) {
    try {
      const { email, senha } = httpRequest.body;

      // Verificar se o usuário existe no banco de dados
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return {
          statusCode: 404,
          body: { message: 'Usuário não encontrado' },
        };
      }

      // Comparar a senha recebida com a senha criptografada
      const senhEhValida = await bcrypt.compare(senha, user.senha);
      if (!senhEhValida) {
        return {
          statusCode: 401,
          body: { message: 'Credenciais inválidas' },
        };
      }

      // Gerar o token JWT
      /* eslint-disable no-undef */
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN, // Token válido por 1 hora
        }
      );

      // Gere o refresh token
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' } // Refresh token expira em 7 dias
      );

      return {
        statusCode: 200,
        body: { token, refreshToken },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { message: 'Erro interno do servidor', error: error.message },
      };
    }
  }
}

module.exports = LoginController;
