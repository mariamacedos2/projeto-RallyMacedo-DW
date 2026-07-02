import { AppError } from "../../errors/AppError.js";

export class PerfilService {
  constructor(repository, usuarioRepository) {
    this.repository = repository;
    this.usuarioRepository = usuarioRepository;
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id) {
    const perfil = await this.repository.findById(id);

    if (!perfil) {
      throw new AppError("Perfil não encontrado", 404);
    }

    return perfil;
  }

  async create(data) {

    const usuario = await this.usuarioRepository.findById(data.usuarioId);

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const existe = await this.repository.findByUsuarioId(data.usuarioId);

    if (existe) {
      throw new AppError("Usuário já possui perfil", 400);
    }

    return this.repository.create(data);
  }

  async update(id, data) {

    const perfil = await this.repository.findById(id);

    if (!perfil) {
      throw new AppError("Perfil não encontrado", 404);
    }

    return this.repository.update(id, data);
  }

  async delete(id) {

    const perfil = await this.repository.findById(id);

    if (!perfil) {
      throw new AppError("Perfil não encontrado", 404);
    }

    await this.repository.delete(id);
  }
}