import Fastify from "fastify";
import { usuarioRoutes } from "./features/usuarios/usuarioRoutes.js";

const fastify = Fastify({
  logger: true
});

// Swagger
await fastify.register(
  (await import("@fastify/swagger")).default,
  {
    swagger: {
      info: {
        title: "Biblioteca API",
        description: "API para gerenciamento de biblioteca",
        version: "1.0.0"
      }
    }
  }
);

// Swagger UI
await fastify.register(
  (await import("@fastify/swagger-ui")).default,
  {
    routePrefix: "/docs"
  }
);

// Rotas
await fastify.register(usuarioRoutes);

// Inicialização
try {
  await fastify.listen({
    port: 3333,
    host: "0.0.0.0"
  });

  console.log("🚀 Servidor rodando em http://localhost:3333");
  console.log("📚 Swagger em http://localhost:3333/docs");
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}