import { Controller, HttpRequest, HttpResponse } from "../../interfaces";
import Prato from "../../models/prato-model";

export class CriarPratoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        nome,
        cozinha,
        descricao_resumida,
        descricao_detalhada,
        imagem,
        valor,
      } = httpRequest.body;

      if (
        !nome ||
        !cozinha ||
        !descricao_resumida ||
        !descricao_detalhada ||
        !imagem ||
        !valor
      ) {
        return {
          statusCode: 400,
          body: { error: "Todos os campos devem sers preenchidos" },
        };
      }

      const prato = await Prato.findOne({ where: { nome } });

      if (prato) {
        return {
          statusCode: 400,
          body: { error: "Prato já está cadastrado" },
        };
      }

      const novoPrato = await Prato.create({
        nome,
        cozinha,
        descricao_resumida,
        descricao_detalhada,
        imagem,
        valor,
      });

      return {
        statusCode: 201,
        body: novoPrato,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: { error: error.message },
      };
    }
  }
}
