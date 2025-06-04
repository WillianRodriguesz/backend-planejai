import { Inject, Injectable } from '@nestjs/common';
import { CriarUsuarioDto } from '../../dtos/usuario/criar-usuario.dto';
import { Usuario } from '../../../domain/entities/usuario/usuario.entity';
import { UsuarioRepository } from 'src/modules/core/domain/entities/repositories/usuario.repository.interface';

@Injectable()
export class CriarUsuarioUseCase {
  constructor(
    @Inject('IUSUARIO_REPOSITORY')
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async executar(dto: CriarUsuarioDto): Promise<Usuario> {
    const novoUsuario = new Usuario(
      dto.nome,
      dto.email,
      dto.senha,
      dto.carteira,
    );

    //RETORNO DELE DEVE SER UM DTO, CRIAR UM MAPPER DE DOMINIO DE USUARIO PARA DTO
    // ou seja, converter a entidade Usuario para um DTO que será retornado
    // domainToDto(usuario: Usuario): UsuarioDto {
    //   return new UsuarioDto(usuario.getId(), usuario.getNome(), usuario.getEmail());
    return await this.usuarioRepository.criarUsuario(novoUsuario);
  }
}
