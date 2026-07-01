import { AppError } from "../../errors/AppError.js";

export class UsuarioService {

  constructor(repository) {
    this.repository = repository;
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id) {

    const usuario =
      await this.repository.findById(id);

    if (!usuario) {
      throw new AppError(
        "Usuário não encontrado",
        404
      );
    }

    return usuario;

  }

  async create(nome, email) {

    const existente =
      await this.repository.findByEmail(email);

    if (existente) {

      throw new AppError(
        "E-mail já cadastrado",
        400
      );

    }

    return this.repository.create(
      nome,
      email
    );

  }

  async update(id, nome, email) {

    const usuario =
      await this.repository.findById(id);

    if (!usuario) {

      throw new AppError(
        "Usuário não encontrado",
        404
      );

    }

    const emailExiste =
      await this.repository.findByEmail(email);

    if (
      emailExiste &&
      emailExiste.id != id
    ) {

      throw new AppError(
        "E-mail já cadastrado",
        400
      );

    }

    return this.repository.update(
      id,
      nome,
      email
    );

  }

  async delete(id) {

    const usuario =
      await this.repository.findById(id);

    if (!usuario) {

      throw new AppError(
        "Usuário não encontrado",
        404
      );

    }

    await this.repository.delete(id);

  }

}