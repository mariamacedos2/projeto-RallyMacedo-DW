export class LivroRepository {
  constructor() {
    this.livros = [];
  }

  findAll() {
    return this.livros;
  }

  create(livro) {
    this.livros.push(livro);
    return livro;
  }
}