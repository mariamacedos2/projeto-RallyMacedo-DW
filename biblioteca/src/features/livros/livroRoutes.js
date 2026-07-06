import { LivroRepository } from "./LivroRepository.js";
import { LivroService } from "./LivroService.js";
import { LivroController } from "./LivroController.js";

const errorResponse = {
  type: "object",
  properties: {
    statusCode: { type: "integer" },
    message: { type: "string" }
  }
};

const livroResponse = {
  type: "object",
  properties: {
    id: { type: "integer" },
    titulo: { type: "string" },
    autor: { type: "string" },
    quantidade: { type: "integer" }
  }
};

export async function livroRoutes(fastify) {

  const repository = new LivroRepository();
  const service = new LivroService(repository);
  const controller = new LivroController(service);

  fastify.get("/livros", {
    schema: {
      tags: ["Livros"],
      summary: "Lista todos os livros",
      response: {
        200: { type: "array", items: livroResponse }
      }
    }
  }, controller.findAll);

 
  fastify.get("/livros/:id", {
    schema: {
      tags: ["Livros"],
      summary: "Busca livro por ID",
      params: {
        type: "object",
        properties: {
          id: { type: "string" }
        }
      },
      response: {
        200: livroResponse,
        404: errorResponse
      }
    }
  }, controller.findById);

  fastify.post("/livros", {
    schema: {
      tags: ["Livros"],
      summary: "Cria um livro",
      body: {
        type: "object",
        required: ["titulo", "autor"],
        properties: {
          titulo: { type: "string" },
          autor: { type: "string" },
          quantidade: { type: "integer" }
        }
      },
      response: {
        201: livroResponse,
        400: errorResponse
      }
    }
  }, controller.create);

  fastify.patch("/livros/:id", {
    schema: {
      tags: ["Livros"],
      summary: "Atualiza livro",
      params: {
        type: "object",
        properties: {
          id: { type: "string" }
        }
      },
      body: {
        type: "object",
        properties: {
          titulo: { type: "string" },
          autor: { type: "string" },
          quantidade: { type: "integer" }
        }
      },
      response: {
        200: livroResponse,
        400: errorResponse,
        404: errorResponse
      }
    }
  }, controller.update);

  fastify.delete("/livros/:id", {
    schema: {
      tags: ["Livros"],
      summary: "Remove livro",
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