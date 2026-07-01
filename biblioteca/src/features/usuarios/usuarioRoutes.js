import { UsuarioRepository } from "./UsuarioRepository.js";
import { UsuarioService } from "./UsuarioService.js";
import { UsuarioController } from "./UsuarioController.js";

export async function usuarioRoutes(fastify) {
  const repository = new UsuarioRepository();
  const service = new UsuarioService(repository);
  const controller = new UsuarioController(service);

  // 📌 LISTAR USUÁRIOS
  fastify.get(
    "/usuarios",
    {
      schema: {
        tags: ["Usuários"],
        summary: "Lista todos os usuários",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer" },
                nome: { type: "string" },
                email: { type: "string" }
              }
            }
          }
        }
      }
    },
    controller.findAll.bind(controller)
  );

  // 📌 BUSCAR POR ID
  fastify.get(
    "/usuarios/:id",
    {
      schema: {
        tags: ["Usuários"],
        summary: "Busca usuário por ID",
        params: {
          type: "object",
          properties: {
            id: { type: "string" }
          }
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "integer" },
              nome: { type: "string" },
              email: { type: "string" }
            }
          }
        }
      }
    },
    controller.findById.bind(controller)
  );

  // 📌 CRIAR USUÁRIO
  fastify.post(
    "/usuarios",
    {
      schema: {
        tags: ["Usuários"],
        summary: "Cria um usuário",
        body: {
          type: "object",
          required: ["nome", "email"],
          properties: {
            nome: { type: "string" },
            email: { type: "string" }
          }
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "integer" },
              nome: { type: "string" },
              email: { type: "string" }
            }
          }
        }
      }
    },
    controller.create.bind(controller)
  );

  // 📌 ATUALIZAR USUÁRIO
  fastify.patch(
    "/usuarios/:id",
    {
      schema: {
        tags: ["Usuários"],
        summary: "Atualiza usuário",
        params: {
          type: "object",
          properties: {
            id: { type: "string" }
          }
        },
        body: {
          type: "object",
          properties: {
            nome: { type: "string" },
            email: { type: "string" }
          }
        }
      }
    },
    controller.update.bind(controller)
  );

  // 📌 DELETAR USUÁRIO
  fastify.delete(
    "/usuarios/:id",
    {
      schema: {
        tags: ["Usuários"],
        summary: "Remove usuário",
        params: {
          type: "object",
          properties: {
            id: { type: "string" }
          }
        },
        response: {
          204: {
            type: "null"
          }
        }
      }
    },
    controller.delete.bind(controller)
  );
}