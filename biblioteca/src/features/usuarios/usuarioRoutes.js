import { UsuarioRepository } from "./UsuarioRepository.js";
import { UsuarioService } from "./UsuarioService.js";
import { UsuarioController } from "./UsuarioController.js";

const errorResponse = {
  type: "object",
  properties: {
    statusCode: { type: "integer" },
    message: { type: "string" }
  }
};

export async function usuarioRoutes(fastify) {
  const repository = new UsuarioRepository();
  const service = new UsuarioService(repository);
  const controller = new UsuarioController(service);

  
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
          },
          404: errorResponse
        }
      }
    },
    controller.findById.bind(controller)
  );

  
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
          },
          400: errorResponse
        }
      }
    },
    controller.create.bind(controller)
  );

  
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
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "integer" },
              nome: { type: "string" },
              email: { type: "string" }
            }
          },
          400: errorResponse,
          404: errorResponse
        }
      }
    },
    controller.update.bind(controller)
  );

  
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
          },
          404: errorResponse
        }
      }
    },
    controller.delete.bind(controller)
  );
}