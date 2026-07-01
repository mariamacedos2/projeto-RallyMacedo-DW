export class LivroService {
  constructor(repository) {
    this.repository = repository;
  }

  listarLivros() {
    return this.repository.findAll();
  }

  criarLivro(data) {
    const livro = {
      id: Date.now(),
      ...data
    };

    return this.repository.create(livro);
  }
}