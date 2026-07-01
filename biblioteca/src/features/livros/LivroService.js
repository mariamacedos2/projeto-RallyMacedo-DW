import { AppError } from "../../errors/AppError.js";

export class LivroService {
  constructor(repository) {
    this.repository = repository;
  }

  async listar() {
    return await this.repository.findAll();
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

    return await this.repository.create(data);
  }

  async atualizar(id, data) {
    const livro = await this.repository.findById(id);

    if (!livro) {
      throw new AppError("Livro não encontrado", 404);
    }

    return await this.repository.update(id, data);
  }

  async deletar(id) {
    const livro = await this.repository.findById(id);

    if (!livro) {
      throw new AppError("Livro não encontrado", 404);
    }

    await this.repository.delete(id);
  }
}