import { AppError } from "../../errors/AppError.js";

export class EmprestimoService {
  constructor(emprestimoRepo, livroRepo, usuarioRepo) {
    this.emprestimoRepo = emprestimoRepo;
    this.livroRepo = livroRepo;
    this.usuarioRepo = usuarioRepo;
  }

  async criar({ usuarioId, livroId }) {

    // 1. validar usuário
    const usuario = await this.usuarioRepo.findById(usuarioId);
    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // 2. validar livro
    const livro = await this.livroRepo.findById(livroId);
    if (!livro) {
      throw new AppError("Livro não encontrado", 404);
    }

    // 3. regra de negócio (estoque)
    if (livro.quantidade <= 0) {
      throw new AppError("Livro sem estoque disponível", 400);
    }

    // 4. criar empréstimo
    const emprestimo = await this.emprestimoRepo.create({ usuarioId });

    // 5. relacionar livro
    await this.emprestimoRepo.addLivro(emprestimo.id, livroId);

    // 6. diminuir quantidade
    await this.livroRepo.updateQuantidade(
      livroId,
      livro.quantidade - 1
    );

    return emprestimo;
  }

  async listar() {
    return this.emprestimoRepo.findAll();
  }

  async buscarDetalhado(id) {
    const dados = await this.emprestimoRepo.findDetalhado(id);

    if (!dados.length) {
      throw new AppError("Empréstimo não encontrado", 404);
    }

    return dados;
  }
}