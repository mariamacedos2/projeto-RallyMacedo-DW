export class UsuarioController {

  constructor(service) {
    this.service = service;
  }

  async findAll(request, reply) {

    const usuarios =
      await this.service.findAll();

    return reply.send(usuarios);
  }

}