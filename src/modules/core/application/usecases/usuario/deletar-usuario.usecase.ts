import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ExisteIdUsecase } from './existeId-usuario.usecase';
import { UsuarioRepository } from 'src/modules/core/domain/entities/repositories/usuario.repository.interface';

@Injectable()
export class DeletarUsecase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    private readonly existeId: ExisteIdUsecase,
  ) {}

  async delete(id: string): Promise<{ mensagem: string }> {
    const existe = await this.existeId.executar(id.toString());

    if (!existe) {
      throw new NotFoundException(`Usuario com id ${id} não foi encontrado!`);
    }

    await this.usuarioRepository.deletar(id.toString());

    return { mensagem: `Usuário com id ${id} foi excluído com sucesso!` };
  }
}
