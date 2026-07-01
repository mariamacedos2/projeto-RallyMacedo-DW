import { LivroRepository } from "./LivroRepository.js";
import { LivroService } from "./LivroService.js";
import { LivroController } from "./LivroController.js";

export async function livroRoutes(fastify) {

  const repository = new LivroRepository();
  const service = new LivroService(repository);
  const controller = new LivroController(service);

  // 📚 LISTAR
  fastify.get("/livros", {
    schema: {
      tags: ["Livros"],
      summary: "Lista todos os livros"
    }
  }, controller.findAll);

  // 📚 BUSCAR POR ID
  fastify.get("/livros/:id", {
    schema: {
      tags: ["Livros"],
      summary: "Busca livro por ID"
    }
  }, controller.findById);

  // 📚 CRIAR
  fastify.post("/livros", {
    schema: {
      tags: ["Livros"],
      summary: "Cria um livro",
      body: {
        type: "object",
        required: ["titulo", "autor"],
        properties: {
          titulo: { type: "string" },
          autor: { type: "string" }
        }
      }
    }
  }, controller.create);

  // 📚 ATUALIZAR
  fastify.patch("/livros/:id", {
    schema: {
      tags: ["Livros"],
      summary: "Atualiza livro"
    }
  }, controller.update);

  // 📚 DELETAR
  fastify.delete("/livros/:id", {
    schema: {
      tags: ["Livros"],
      summary: "Remove livro"
    }
  }, controller.delete);
}