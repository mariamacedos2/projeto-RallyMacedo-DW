export class LivroController {
  constructor(service) {
    this.service = service;
  }

  findAll = async (req, reply) => {
    const livros = await this.service.listar();
    return reply.send(livros);
  };

  findById = async (req, reply) => {
    const livro = await this.service.buscarPorId(req.params.id);
    return reply.send(livro);
  };

  create = async (req, reply) => {
    const livro = await this.service.criar(req.body);
    return reply.code(201).send(livro);
  };

  update = async (req, reply) => {
    const livro = await this.service.atualizar(
      req.params.id,
      req.body
    );
    return reply.send(livro);
  };

  delete = async (req, reply) => {
    await this.service.deletar(req.params.id);
    return reply.code(204).send();
  };
}