import Fastify from "fastify";

import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

import { usuarioRoutes } from "./features/usuarios/usuarioRoutes.js";
import { livroRoutes } from "./features/livros/livroRoutes.js";
import { emprestimoRoutes } from "./features/emprestimos/emprestimoRoutes.js";
import { perfilRoutes } from "./features/perfis/perfilRoutes.js";

import { errorHandler } from "./errors/errorHandler.js";

const fastify = Fastify({
  logger: true
});

// ===============================
// SWAGGER
// ===============================
await fastify.register(swagger, {
  swagger: {
    info: {
      title: "Biblioteca API",
      description: "API de biblioteca com usuários, livros, perfis e empréstimos",
      version: "1.0.0"
    }
  }
});

// ===============================
// SWAGGER UI
// ===============================
await fastify.register(swaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false
  }
});

// ===============================
// ROTAS
// ===============================
await fastify.register(usuarioRoutes);
await fastify.register(livroRoutes);
await fastify.register(perfilRoutes);
await fastify.register(emprestimoRoutes);

// ===============================
// ERROR HANDLER GLOBAL
// ===============================
fastify.setErrorHandler(errorHandler);

// ===============================
// START SERVER
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
    console.log("API: http://localhost:3333");
    console.log("Swagger: http://localhost:3333/docs");
    console.log("==================================");

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();