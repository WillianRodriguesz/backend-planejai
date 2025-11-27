import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioModel } from '../models/usuario.model';
import { UsuarioMapper } from '../mappers/usuario.mapper';
import { UsuariosCredenciaisRepository } from '../../domain/repositories/UsuariosCredenciais.repository';

@Injectable()
export class UsuarioCredenciaisRepositoryImpl
  implements UsuariosCredenciaisRepository
{
  constructor(
    @InjectRepository(UsuarioModel)
    private readonly repo: Repository<UsuarioModel>,
  ) {}

  async findPorTelefone(
    telefone: string,
  ): Promise<{
    usuario: import('../../domain/Usuario').Usuario;
    passwordHash: string;
  } | null> {
    const model = await this.repo.findOne({ where: { telefone } });
    if (!model) return null;
    const usuario = UsuarioMapper.ModelToDomain(model);
    return { usuario, passwordHash: model.senha };
  }
}
