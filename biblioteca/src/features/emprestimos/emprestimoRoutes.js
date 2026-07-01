import { EmprestimoRepository } from "./EmprestimoRepository.js";
import { EmprestimoService } from "./EmprestimoService.js";
import { EmprestimoController } from "./EmprestimoController.js";

import { LivroRepository } from "../livros/LivroRepository.js";
import { UsuarioRepository } from "../usuarios/UsuarioRepository.js";

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
      }
    }
  }, controller.create);

  // 📌 LISTAR
  fastify.get("/emprestimos", {
    schema: {
      tags: ["Empréstimos"],
      summary: "Lista empréstimos"
    }
  }, controller.findAll);

  // 📌 DETALHADO (JOIN - OBRIGATÓRIO PRO TRABALHO)
  fastify.get("/emprestimos/:id", {
    schema: {
      tags: ["Empréstimos"],
      summary: "Busca empréstimo com JOIN"
    }
  }, controller.findDetalhado);
}