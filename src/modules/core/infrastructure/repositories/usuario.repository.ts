import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../domain/usuario';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { UsuarioModel } from '../models/usuario.model';
import { UsuarioMapper } from '../mappers/usuario.mapper';

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioModel)
    private readonly usuarioModelRepository: Repository<UsuarioModel>,
  ) {}

  async salvar(usuario: Usuario): Promise<void> {
    const model = UsuarioMapper.DomainToModel(usuario) as UsuarioModel;
    model.senha = usuario.getSenha();
    await this.usuarioModelRepository.save(model);
    usuario.setId(model.id);
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    const model = await this.usuarioModelRepository.findOne({ where: { id } });
    return model ? UsuarioMapper.ModelToDomain(model) : null;
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const model = await this.usuarioModelRepository.findOne({
      where: { email },
    });
    return model ? UsuarioMapper.ModelToDomain(model) : null;
  }

  async buscarPorTokenRedefinicao(tokenHash: string): Promise<Usuario | null> {
    const model = await this.usuarioModelRepository.findOne({
      where: { tokenRedefinicaoSenha: tokenHash },
    });
    return model ? UsuarioMapper.ModelToDomain(model) : null;
  }

  async buscarTodos(): Promise<Usuario[]> {
    const models = await this.usuarioModelRepository.find();
    return UsuarioMapper.ModelToDomainList(models);
  }

  async atualizar(id: string, usuario: Partial<Usuario>): Promise<void> {
    const updateData = UsuarioMapper.DomainToModel(usuario as Usuario);
    if (usuario.getSenha) {
      (updateData as any).senha = usuario.getSenha();
    }
    await this.usuarioModelRepository.update(id, updateData);
  }

  async deletar(id: string): Promise<void> {
    await this.usuarioModelRepository.delete(id);
  }
}
