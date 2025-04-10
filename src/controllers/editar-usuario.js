const User = require('../models/user-model');
class EditarUsuarioController {
  async handle(req) {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    try {
      const usuario = await User.findByPk(id);
      if (!usuario) {
        return {
          statusCode: 404,
          body: { error: 'Usuário não encontrado' },
        };
      }
      await usuario.update({
        nome,
        email,
        senha,
      });
      return {
        statusCode: 200,
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

module.exports = EditarUsuarioController;
