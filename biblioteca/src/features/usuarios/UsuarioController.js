export class UsuarioController {

  constructor(service) {
    this.service = service;
  }

  async findAll(request, reply) {

    const usuarios =
      await this.service.findAll();

    return reply.send(usuarios);

  }

  async findById(request, reply) {

    const { id } = request.params;

    const usuario =
      await this.service.findById(id);

    return reply.send(usuario);

  }

  async create(request, reply) {

    const { nome, email } = request.body;

    const usuario =
      await this.service.create(
        nome,
        email
      );

    return reply
      .code(201)
      .send(usuario);

  }

  async update(request, reply) {

    const { id } = request.params;

    const { nome, email } =
      request.body;

    const usuario =
      await this.service.update(
        id,
        nome,
        email
      );

    return reply.send(usuario);

  }

  async delete(request, reply) {

    const { id } = request.params;

    await this.service.delete(id);

    return reply.code(204).send();

  }

}