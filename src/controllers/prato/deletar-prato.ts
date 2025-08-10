import { Controller, HttpRequest, HttpResponse } from "../../interfaces";
import Prato from "../../models/prato-model";

export default class DeletarPratoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params.id;
      const prato = await Prato.findByPk(id);

      if (!prato) {
        return {
          statusCode: 404,
          body: { error: "Prato não encontrado" },
        };
      }

      await prato.destroy();

      return {
        statusCode: 204,
        body: {},
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: { error: error.message },
      };
    }
  }
}
