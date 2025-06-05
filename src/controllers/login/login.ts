import User from '../../models/user-model';
import bcrypt from 'bcrypt';
import { Controller, HttpRequest, HttpResponse } from '../../interfaces';
import jwt, { SignOptions } from 'jsonwebtoken';
import { ENV } from '../../config/env';

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
      const senhaEhValida = await bcrypt.compare(senha, user.senha);
      if (!senhaEhValida) {
        return {
          statusCode: 401,
          body: { message: 'Credenciais inválidas' },
        };
      }

      // Configurações para o access token
      const accessTokenOptions: SignOptions = {
        expiresIn: (ENV.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '15m',
      };

      // Configurações para o refresh token
      const refreshTokenOptions: SignOptions = {
        expiresIn: (ENV.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn']) || '7d',
      };

      // Gerar o access token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        ENV.JWT_SECRET || 'default_secret',
        accessTokenOptions
      );

      // Gerar o refresh token
      const refreshToken = jwt.sign(
        { id: user.id },
        ENV.JWT_REFRESH_SECRET || 'default_refresh_secret',
        refreshTokenOptions
      );

      // Retornar sucesso (você pode adicionar lógica para gerar tokens aqui)
      return {
        statusCode: 200,
        body: {
          message: 'Login realizado com sucesso',
          token,
          refreshToken,
        },
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        statusCode: 500,
        body: { message: 'Erro interno do servidor' },
      };
    }
  }
}

export default LoginController;
