import { Controller, HttpRequest, HttpResponse } from '../../interfaces';
import User from '../../models/user-model';

class ListarUsuarioController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.params.id;
      const usuario = await User.findByPk(userId);
      console.log('userId', userId);
      if (!usuario && userId !== '{id}') {
        return {
          statusCode: 404,
          body: { error: 'Usuário não encontrado' },
        };
      } else if (userId !== '{id}') {
        return {
          statusCode: 200,
          body: usuario,
        };
      }
      const usuarios = await User.findAll();
      return {
        statusCode: 200,
        body: usuarios,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: { error: error.message },
      };
    }
  }
}

export default ListarUsuarioController;
