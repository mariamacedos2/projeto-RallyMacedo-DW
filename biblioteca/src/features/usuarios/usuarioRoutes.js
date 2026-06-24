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

}