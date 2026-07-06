import { PerfilRepository } from "./PerfilRepository.js";
import { PerfilService } from "./PerfilService.js";
import { PerfilController } from "./PerfilController.js";
import { UsuarioRepository } from "../usuarios/UsuarioRepository.js";

const errorResponse = {
  type: "object",
  properties: {
    statusCode: { type: "integer" },
    message: { type: "string" }
  }
};

const perfilResponse = {
  type: "object",
  properties: {
    id: { type: "integer" },
    telefone: { type: "string" },
    endereco: { type: "string" },
    usuario_id: { type: "integer" }
  }
};

export async function perfilRoutes(fastify) {

  const repository = new PerfilRepository();
  const usuarioRepository = new UsuarioRepository();

  const service = new PerfilService(repository, usuarioRepository);
  const controller = new PerfilController(service);

  fastify.get("/perfis", {
    schema: {
      tags: ["Perfis"],
      summary: "Lista todos os perfis",
      response: {
        200: { type: "array", items: perfilResponse }
      }
    }
  }, controller.findAll);

  fastify.get("/perfis/:id", {
    schema: {
      tags: ["Perfis"],
      summary: "Busca perfil por ID",
      params: {
        type: "object",
        properties: {
          id: { type: "string" }
        }
      },
      response: {
        200: perfilResponse,
        404: errorResponse
      }
    }
  }, controller.findById);

  fastify.post("/perfis", {
    schema: {
      tags: ["Perfis"],
      summary: "Cria perfil",
      body: {
        type: "object",
        required: ["telefone", "endereco", "usuarioId"],
        properties: {
          telefone: { type: "string" },
          endereco: { type: "string" },
          usuarioId: { type: "integer" }
        }
      },
      response: {
        201: perfilResponse,
        400: errorResponse,
        404: errorResponse
      }
    }
  }, controller.create);

  fastify.patch("/perfis/:id", {
    schema: {
      tags: ["Perfis"],
      summary: "Atualiza perfil",
      params: {
        type: "object",
        properties: {
          id: { type: "string" }
        }
      },
      body: {
        type: "object",
        properties: {
          telefone: { type: "string" },
          endereco: { type: "string" }
        }
      },
      response: {
        200: perfilResponse,
        404: errorResponse
      }
    }
  }, controller.update);


  fastify.delete("/perfis/:id", {
    schema: {
      tags: ["Perfis"],
      summary: "Remove perfil",
      params: {
        type: "object",
        properties: {
          id: { type: "string" }
        }
      },
      response: {
        204: { type: "null" },
        404: errorResponse
      }
    }
  }, controller.delete);
}