import { pool } from "../../config/database.js";

export class LivroRepository {

  async findAll() {
    const result = await pool.query("SELECT * FROM livros ORDER BY id");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM livros WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }

  async create(livro) {
    const result = await pool.query(
      `INSERT INTO livros (titulo, autor, quantidade)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [livro.titulo, livro.autor, livro.quantidade || 1]
    );

    return result.rows[0];
  }

  async updateQuantidade(id, quantidade) {
    const result = await pool.query(
      `UPDATE livros
       SET quantidade = $1
       WHERE id = $2
       RETURNING *`,
      [quantidade, id]
    );

    return result.rows[0];
  }

  async delete(id) {
    await pool.query("DELETE FROM livros WHERE id = $1", [id]);
  }
}