import { AppError } from "../../errors/AppError.js";

export class EmprestimoService {
  constructor(emprestimoRepo, livroRepo, usuarioRepo) {
    this.emprestimoRepo = emprestimoRepo;
    this.livroRepo = livroRepo;
    this.usuarioRepo = usuarioRepo;
  }

  async criar({ usuarioId, livroId }) {

    const usuario = await this.usuarioRepo.findById(usuarioId);
    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const livro = await this.livroRepo.findById(livroId);
    if (!livro) {
      throw new AppError("Livro não encontrado", 404);
    }

    if (!livro.disponivel) {
      throw new AppError("Livro já está emprestado", 400);
    }

    // cria empréstimo
    const emprestimo = await this.emprestimoRepo.create({ usuarioId });

    // relaciona livro
    await this.emprestimoRepo.addLivro(emprestimo.id, livroId);

    // marca livro como indisponível
    await this.livroRepo.update(livroId, {
      titulo: livro.titulo,
      autor: livro.autor,
      disponivel: false
    });

    return emprestimo;
  }

  async listar() {
    return await this.emprestimoRepo.findAll();
  }

  async buscarDetalhado(id) {
    const dados = await this.emprestimoRepo.findDetalhado(id);

    if (!dados.length) {
      throw new AppError("Empréstimo não encontrado", 404);
    }

    return dados;
  }
}