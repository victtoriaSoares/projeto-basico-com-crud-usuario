import path from "path";
import { ENV } from "./env";
import fs from "fs";
import { Sequelize } from "sequelize";

export const initializeDatabaseAndServer = async (sequelize: Sequelize) => {
  if (!ENV.UPDATE_MODEL) return;

  try {
    const modelsPath = path.resolve(__dirname, "../models");
    console.log("Caminho dos modelos:", modelsPath);
    const modelFiles = fs
      .readdirSync(modelsPath)
      .filter((file) => file.endsWith("-model.ts"));

    console.log("Arquivos de modelos encontrados:", modelFiles);

    const db: { [key: string]: any } = {
      sequelize,
      Sequelize,
    };

    for (const file of modelFiles) {
      const model = (await import(path.join(modelsPath, file))).default;
      const modelName = file.replace("-model.ts", "");
      db[modelName] = model;
    }

    console.log(
      "Modelos carregados:",
      Object.keys(db).filter(
        (key) => key !== "sequelize" && key !== "Sequelize"
      )
    );
    sequelize
      .sync({ force: true, alter: true })
      .then(() => {
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
      })
      .catch((err: any) => {
        console.error("Erro ao sincronizar o banco de dados:", err);
      });
    console.log("Banco de dados sincronizado");
  } catch (err: any) {
    console.error("Erro ao sincronizar o banco de dados:", err);
  }
};
