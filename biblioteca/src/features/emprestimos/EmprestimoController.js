export class EmprestimoController {
  constructor(service) {
    this.service = service;
  }

  create = async (req, reply) => {
    const emprestimo = await this.service.criar(req.body);
    return reply.code(201).send(emprestimo);
  };

  findAll = async (req, reply) => {
    const dados = await this.service.listar();
    return reply.send(dados);
  };

  findDetalhado = async (req, reply) => {
    const dados = await this.service.buscarDetalhado(req.params.id);
    return reply.send(dados);
  };
}