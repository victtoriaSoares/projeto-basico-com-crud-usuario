mkdir -p src/adapters src/controllers/login src/controllers/usuario src/middlewares src/models src/routes config src/interfaces

touch src/database.ts src/server.ts src/swaggerConfig.ts .env .env-exemplo .gitignore src/adapters/express-route-adapter.ts src/controllers/usuario/criar-usuario.ts src/controllers/usuario/listar-usuario.ts src/controllers/usuario/editar-usuario.ts src/controllers/usuario/deletar-usuario.ts src/controllers/login/login.ts src/controllers/login/refresh-token.ts src/middlewares/auth-middleware.ts src/middlewares/body-parser.ts src/middlewares/content-type.ts src/middlewares/cors.ts src/middlewares/index.ts src/models/user-model.ts src/routes/loginRoutes.ts src/routes/userRoutes.ts tsconfig.json nodemon.json src/interfaces/index.ts

yarn add -D @types/bcrypt @types/express @types/jsonwebtoken @types/node sucrase ts-node typescript nodemon @types/swagger-ui-express @types/swagger-jsdoc @types/dotenv

yarn add bcrypt express jsonwebtoken mysql2 sequelize swagger-jsdoc swagger-ui-express dotenv fast-glob