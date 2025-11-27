import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioModel } from '../models/usuario.model';
import { UsuarioWriteRepository as UsuarioWriteRepositoryContract } from '../../domain/repositories/Usuario.repository';

@Injectable()
export class UsuarioWriteRepositoryImpl
  implements UsuarioWriteRepositoryContract
{
  constructor(
    @InjectRepository(UsuarioModel)
    private readonly repo: Repository<UsuarioModel>,
  ) {}

  async existsByTelefone(telefone: string): Promise<boolean> {
    const found = await this.repo.findOne({ where: { telefone } });
    return !!found;
  }

  async createUsuario(data: {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
  }): Promise<{ id: string; nome: string; email: string; telefone: string }> {
    const entity = this.repo.create({
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      senha: data.senha,
    });
    const saved = await this.repo.save(entity);
    return {
      id: saved.id,
      nome: saved.nome,
      email: saved.email,
      telefone: saved.telefone,
    };
  }
}
