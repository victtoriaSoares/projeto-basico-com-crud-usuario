const User = require('../models/user-model');

class ListarUsuarioController {
  async handle(req, res) {
    try {
        const usuarios = await User.findAll();
        return {
            statusCode: 200,
            body: usuarios,
        };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: error.message },
      };
        
    }
  }
}

module.exports = ListarUsuarioController;