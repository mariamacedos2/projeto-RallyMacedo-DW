import { EmprestimoRepository } from "./EmprestimoRepository.js";
import { EmprestimoService } from "./EmprestimoService.js";
import { EmprestimoController } from "./EmprestimoController.js";

import { LivroRepository } from "../livros/LivroRepository.js";
import { UsuarioRepository } from "../usuarios/UsuarioRepository.js";

const errorResponse = {
  type: "object",
  properties: {
    statusCode: { type: "integer" },
    message: { type: "string" }
  }
};

export async function emprestimoRoutes(fastify) {

  const emprestimoRepo = new EmprestimoRepository();
  const livroRepo = new LivroRepository();
  const usuarioRepo = new UsuarioRepository();

  const service = new EmprestimoService(
    emprestimoRepo,
    livroRepo,
    usuarioRepo
  );

  const controller = new EmprestimoController(service);

  // 📌 CRIAR EMPRÉSTIMO
  fastify.post("/emprestimos", {
    schema: {
      tags: ["Empréstimos"],
      summary: "Cria um empréstimo",
      body: {
        type: "object",
        required: ["usuarioId", "livroId"],
        properties: {
          usuarioId: { type: "integer" },
          livroId: { type: "integer" }
        }
      },
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "integer" },
            usuario_id: { type: "integer" },
            data_emprestimo: { type: "string" }
          }
        },
        400: errorResponse,
        404: errorResponse
      }
    }
  }, controller.create);


  fastify.get("/emprestimos", {
    schema: {
      tags: ["Empréstimos"],
      summary: "Lista empréstimos",
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              usuario_id: { type: "integer" },
              data_emprestimo: { type: "string" }
            }
          }
        }
      }
    }
  }, controller.findAll);


  fastify.get("/emprestimos/:id", {
    schema: {
      tags: ["Empréstimos"],
      summary: "Busca empréstimo com JOIN (usuário + livros)",
      params: {
        type: "object",
        properties: {
          id: { type: "string" }
        }
      },
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              emprestimo_id: { type: "integer" },
              usuario: { type: "string" },
              email: { type: "string" },
              livro: { type: "string" },
              data_emprestimo: { type: "string" }
            }
          }
        },
        404: errorResponse
      }
    }
  }, controller.findDetalhado);

  
  fastify.patch("/emprestimos/:id", {
    schema: {
      tags: ["Empréstimos"],
      summary: "Atualiza o usuário responsável pelo empréstimo",
      params: {
        type: "object",
        properties: {
          id: { type: "string" }
        }
      },
      body: {
        type: "object",
        required: ["usuarioId"],
        properties: {
          usuarioId: { type: "integer" }
        }
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "integer" },
            usuario_id: { type: "integer" },
            data_emprestimo: { type: "string" }
          }
        },
        400: errorResponse,
        404: errorResponse
      }
    }
  }, controller.update);

  fastify.delete("/emprestimos/:id", {
    schema: {
      tags: ["Empréstimos"],
      summary: "Remove um empréstimo",
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