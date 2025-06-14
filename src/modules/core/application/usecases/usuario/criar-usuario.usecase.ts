import { Inject, Injectable } from '@nestjs/common';
import { CriarUsuarioDto } from '../../dtos/usuario/criar-usuario.dto';
import { Usuario } from '../../../domain/entities/usuario/usuario.entity';
import { UsuarioRepository } from 'src/modules/core/domain/entities/repositories/usuario.repository.interface';
import { UsuarioMapper } from '../../mappers/usuario.mapper';
import { UsuarioDto } from '../../dtos/usuario/usuario.dto';

@Injectable()
export class CriarUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async executar(dto: CriarUsuarioDto): Promise<UsuarioDto> {
    const novoUsuario = new Usuario(
      dto.nome,
      dto.email,
      dto.senha,
      dto.carteira,
    );

    const usuarioCriado = await this.usuarioRepository.criarUsuario(novoUsuario);

    return UsuarioMapper.toDto(usuarioCriado); //criei o retorno dto
  }
}
