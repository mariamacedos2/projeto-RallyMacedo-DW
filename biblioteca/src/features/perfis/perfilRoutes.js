import { PerfilRepository } from "./PerfilRepository.js";
import { PerfilService } from "./PerfilService.js";
import { PerfilController } from "./PerfilController.js";
import { UsuarioRepository } from "../usuarios/UsuarioRepository.js";

export async function perfilRoutes(fastify) {

  const repository = new PerfilRepository();
  const usuarioRepository = new UsuarioRepository();

  const service = new PerfilService(repository, usuarioRepository);
  const controller = new PerfilController(service);

  fastify.get("/perfis", controller.findAll);
  fastify.get("/perfis/:id", controller.findById);

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
      }
    }
  }, controller.create);

  fastify.patch("/perfis/:id", controller.update);
  fastify.delete("/perfis/:id", controller.delete);
}