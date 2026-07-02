import { pool } from "../../config/database.js";

export class PerfilRepository {

  async findAll() {
    const result = await pool.query(`
      SELECT * FROM perfis
    `);
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(`
      SELECT * FROM perfis WHERE id = $1
    `, [id]);

    return result.rows[0];
  }

  async findByUsuarioId(usuarioId) {
    const result = await pool.query(`
      SELECT * FROM perfis WHERE usuario_id = $1
    `, [usuarioId]);

    return result.rows[0];
  }

  async create(data) {
    const result = await pool.query(`
      INSERT INTO perfis (telefone, endereco, usuario_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [data.telefone, data.endereco, data.usuarioId]);

    return result.rows[0];
  }

  async update(id, data) {
    const result = await pool.query(`
      UPDATE perfis
      SET telefone = COALESCE($1, telefone),
          endereco = COALESCE($2, endereco)
      WHERE id = $3
      RETURNING *
    `, [data.telefone, data.endereco, id]);

    return result.rows[0];
  }

  async delete(id) {
    await pool.query(`
      DELETE FROM perfis WHERE id = $1
    `, [id]);
  }
}