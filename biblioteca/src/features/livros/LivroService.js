import { AppError } from "../../errors/AppError.js";

export class LivroService {
  constructor(repository) {
    this.repository = repository;
  }

  async listar() {
    return this.repository.findAll();
  }

  async buscarPorId(id) {
    const livro = await this.repository.findById(id);

    if (!livro) {
      throw new AppError("Livro não encontrado", 404);
    }

    return livro;
  }

  async criar(data) {
    if (!data.titulo || !data.autor) {
      throw new AppError("Título e autor são obrigatórios", 400);
    }

    return this.repository.create(data);
  }

  async reduzirQuantidade(id) {
    const livro = await this.repository.findById(id);

    if (!livro) {
      throw new AppError("Livro não encontrado", 404);
    }

    if (livro.quantidade <= 0) {
      throw new AppError("Livro sem estoque", 400);
    }

    return this.repository.updateQuantidade(id, livro.quantidade - 1);
  }
}