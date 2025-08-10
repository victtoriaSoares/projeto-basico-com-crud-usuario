import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Exporta as variáveis de ambiente para uso em todo o projeto
export const ENV = {
  PORT: process.env.PORT || "3000",
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  NODE_ENV: process.env.NODE_ENV || "development",
  API_VERSION: process.env.API_VERSION || "v1",
  UPDATE_MODEL: process.env.UPDATE_MODEL || false,
};
