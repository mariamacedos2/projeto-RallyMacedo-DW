import { pool } from "../../config/database.js";

export class UsuarioRepository {

  async findAll() {
    const result = await pool.query(
      "SELECT * FROM usuarios"
    );

    return result.rows;
  }

}