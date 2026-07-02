export class PerfilController {
  constructor(service) {
    this.service = service;
  }

  findAll = async (req, reply) => {
    const perfis = await this.service.findAll();
    return reply.send(perfis);
  };

  findById = async (req, reply) => {
    const perfil = await this.service.findById(Number(req.params.id));
    return reply.send(perfil);
  };

  create = async (req, reply) => {
    const perfil = await this.service.create(req.body);
    return reply.code(201).send(perfil);
  };

  update = async (req, reply) => {
    const perfil = await this.service.update(
      Number(req.params.id),
      req.body
    );

    return reply.send(perfil);
  };

  delete = async (req, reply) => {
    await this.service.delete(Number(req.params.id));
    return reply.code(204).send();
  };
}