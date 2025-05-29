import { HttpRequest, HttpResponse } from '../../interfaces';
import User from '../../models/user-model';
import bcrypt from 'bcrypt';
import validator from 'validator';
class CriarUsuarioController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { nome, email, senha } = httpRequest.body;

      // Verifica se todos os campos obrigatórios foram preenchidos
      if (!nome || !email || !senha) {
        return {
          statusCode: 400,
          body: { error: 'Todos os campos são obrigatórios' },
        };
      }
      // Verifica se o nome tem pelo menos 3 caracteres
      if (nome.length < 3) {
        return {
          statusCode: 400,
          body: { error: 'O nome deve ter pelo menos 3 caracteres' },
        };
      }

      // Validação dos dados de entrada
      if(validator.isEmail(email) === false) {
        return {
          statusCode: 400,
          body: { error: 'Email inválido' },
        };
      }
      const user = await User.findOne({ where: { email } });

      if (user) {
        return {
          statusCode: 400,
          body: { error: 'Email já cadastrado' },
        };
      }

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
    } catch (error: any) {
      return {
        statusCode: 500,
        body: { error: error.message },
      };
    }
  }
}

export default CriarUsuarioController;
