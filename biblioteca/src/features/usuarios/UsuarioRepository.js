import { pool } from "../../config/database.js";

export class UsuarioRepository {

  async findAll() {

    const result =
      await pool.query(
        "SELECT * FROM usuarios"
      );

    return result.rows;

  }

  async findById(id) {

    const result =
      await pool.query(
        "SELECT * FROM usuarios WHERE id=$1",
        [id]
      );

    return result.rows[0];

  }

  async findByEmail(email) {

    const result =
      await pool.query(
        "SELECT * FROM usuarios WHERE email=$1",
        [email]
      );

    return result.rows[0];

  }

  async create(nome, email) {

    const result =
      await pool.query(
        `INSERT INTO usuarios(nome,email)
         VALUES($1,$2)
         RETURNING *`,
        [nome, email]
      );

    return result.rows[0];

  }

  async update(id, nome, email) {

    const result =
      await pool.query(
        `UPDATE usuarios
         SET nome=$1,
             email=$2
         WHERE id=$3
         RETURNING *`,
        [nome, email, id]
      );

    return result.rows[0];

  }

  async delete(id) {

    await pool.query(
      "DELETE FROM usuarios WHERE id=$1",
      [id]
    );

  }

}