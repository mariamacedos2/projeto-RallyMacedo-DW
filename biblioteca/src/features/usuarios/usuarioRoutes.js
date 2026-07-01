import { UsuarioRepository } from "./UsuarioRepository.js";
import { UsuarioService } from "./UsuarioService.js";
import { UsuarioController } from "./UsuarioController.js";

export async function usuarioRoutes(fastify) {

  const repository = new UsuarioRepository();

  const service = new UsuarioService(repository);

  const controller = new UsuarioController(service);

  fastify.get(
    "/usuarios",
    controller.findAll.bind(controller)
  );

  fastify.get(
    "/usuarios/:id",
    controller.findById.bind(controller)
  );

  fastify.post(
    "/usuarios",
    controller.create.bind(controller)
  );

  fastify.patch(
    "/usuarios/:id",
    controller.update.bind(controller)
  );

  fastify.delete(
    "/usuarios/:id",
    controller.delete.bind(controller)
  );

}