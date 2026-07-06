import { pool } from "../../config/database.js";

export class EmprestimoRepository {

  async create(data) {
    const result = await pool.query(
      `INSERT INTO emprestimos (usuario_id, data_emprestimo)
       VALUES ($1, NOW())
       RETURNING *`,
      [data.usuarioId]
    );

    return result.rows[0];
  }

  async addLivro(emprestimoId, livroId) {
    await pool.query(
      `INSERT INTO emprestimo_livros (emprestimo_id, livro_id)
       VALUES ($1, $2)`,
      [emprestimoId, livroId]
    );
  }

  async findAll() {
    const result = await pool.query(`
      SELECT * FROM emprestimos ORDER BY id DESC
    `);

    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM emprestimos WHERE id = $1",
      [id]
    );

    return result.rows[0];
  }

  async findLivrosByEmprestimo(id) {
    const result = await pool.query(
      "SELECT livro_id FROM emprestimo_livros WHERE emprestimo_id = $1",
      [id]
    );

    return result.rows;
  }

  async findDetalhado(id) {
    const result = await pool.query(`
      SELECT
        e.id AS emprestimo_id,
        u.nome AS usuario,
        u.email,
        l.titulo AS livro,
        e.data_emprestimo
      FROM emprestimos e
      INNER JOIN usuarios u ON u.id = e.usuario_id
      INNER JOIN emprestimo_livros el ON el.emprestimo_id = e.id
      INNER JOIN livros l ON l.id = el.livro_id
      WHERE e.id = $1
    `, [id]);

    return result.rows;
  }

  async update(id, usuarioId) {
    const result = await pool.query(
      `UPDATE emprestimos
       SET usuario_id = $1
       WHERE id = $2
       RETURNING *`,
      [usuarioId, id]
    );

    return result.rows[0];
  }

  async delete(id) {
    await pool.query(
      "DELETE FROM emprestimo_livros WHERE emprestimo_id = $1",
      [id]
    );

    await pool.query(
      "DELETE FROM emprestimos WHERE id = $1",
      [id]
    );
  }
}