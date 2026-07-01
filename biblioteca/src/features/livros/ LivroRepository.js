import { pool } from "../../config/database.js";

export class LivroRepository {

  async findAll() {
    const result = await pool.query("SELECT * FROM livros");
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
      `INSERT INTO livros (titulo, autor, disponivel)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [livro.titulo, livro.autor, true]
    );
    return result.rows[0];
  }

  async update(id, data) {
    const result = await pool.query(
      `UPDATE livros
       SET titulo = COALESCE($1, titulo),
           autor = COALESCE($2, autor)
       WHERE id = $3
       RETURNING *`,
      [data.titulo, data.autor, id]
    );

    return result.rows[0];
  }

  async delete(id) {
    await pool.query("DELETE FROM livros WHERE id = $1", [id]);
  }
}