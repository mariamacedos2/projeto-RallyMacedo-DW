import Fastify from "fastify";

import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

import { usuarioRoutes } from "./features/usuarios/usuarioRoutes.js";
import { errorHandler } from "./errors/errorHandler.js";

const fastify = Fastify({
  logger: true
});

// ===============================
// Swagger
// ===============================

await fastify.register(swagger, {
  swagger: {
    info: {
      title: "Biblioteca API",
      description: "API para gerenciamento de biblioteca",
      version: "1.0.0"
    },
    host: "localhost:3333",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"]
  }
});

// ===============================
// Swagger UI
// ===============================

await fastify.register(swaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false
  }
});

// ===============================
// Error Handler Global
// ===============================

fastify.setErrorHandler(errorHandler);

// ===============================
// Rotas
// ===============================

await fastify.register(usuarioRoutes);

// Futuramente ficará assim:
//
// await fastify.register(livroRoutes);
// await fastify.register(perfilRoutes);
// await fastify.register(emprestimoRoutes);

// ===============================
// Inicialização
// ===============================

const start = async () => {
  try {

    await fastify.listen({
      port: 3333,
      host: "0.0.0.0"
    });

    console.log("==================================");
    console.log("🚀 Servidor iniciado!");
    console.log("==================================");
    console.log("API:");
    console.log("http://localhost:3333");
    console.log("");
    console.log("Swagger:");
    console.log("http://localhost:3333/docs");
    console.log("==================================");

  } catch (err) {

    fastify.log.error(err);

    process.exit(1);

  }
};

start();