export class LivroController {
  constructor(service) {
    this.service = service;
  }

  findAll = async (request, reply) => {
    const livros = this.service.listarLivros();
    return reply.send(livros);
  };

  create = async (request, reply) => {
    const livro = this.service.criarLivro(request.body);
    return reply.code(201).send(livro);
  };
}