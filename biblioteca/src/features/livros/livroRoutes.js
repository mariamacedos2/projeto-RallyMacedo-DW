import { LivroRepository } from "./LivroRepository.js";
import { LivroService } from "./LivroService.js";
import { LivroController } from "./LivroController.js";

export async function livroRoutes(fastify) {
  const repository = new LivroRepository();
  const service = new LivroService(repository);
  const controller = new LivroController(service);

  fastify.get("/livros", controller.findAll.bind(controller));
  fastify.post("/livros", controller.create.bind(controller));
}