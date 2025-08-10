import { Controller, HttpRequest, HttpResponse } from "../../interfaces";
import Prato from "../../models/prato-model";

export class ListarPratoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id;
      const usuario = await Prato.findByPk(id);

      if (!usuario && id !== `{id}` && id !== undefined) {
        return {
          statusCode: 404,
          body: { error: "Prato não encontrado" },
        };
      } else if (id !== `{id}` && id !== undefined) {
        return {
          statusCode: 200,
          body: usuario,
        };
      }

      const usuarios = await Prato.findAll();

      if (usuarios.length === 0) {
        return {
          statusCode: 404,
          body: { error: "A lista de pratos não pode ser encontrada" },
        };
      }

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
