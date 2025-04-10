const User = require('../models/user-model');
const bcrypt = require('bcrypt');
class CriarUsuarioController {
  /**
   * @param {HttpRequest} request - Objeto da requisição HTTP
   * @returns {Promise<HttpResponse>}
   */
  async handle(httpRequest) {
    try {
      const { nome, email, senha } = httpRequest.body;

      const salt = 10;

      const senhaCriptografada = await bcrypt.hash(senha, salt);

      const usuario = await User.create({
        nome,
        email,
        senha: senhaCriptografada,
      });

      return {
        statusCode: 201,
        body: usuario,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: error.message },
      };
    }
  }
}

module.exports = CriarUsuarioController;
