import { Injectable, Inject } from '@nestjs/common';
import { Usuario } from '../../../domain/usuario';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository'; 
import { BcryptHashService } from '../../../infrastructure/services/hash-bcrypt.service';
import { UsuarioDto } from '../../dtos/usuario/usuario.dto';
import { UsuarioMapper } from '../../mappers/usuario.mapper';
import { Carteira } from '../../../domain/carteira'; 

export interface CriarUsuarioProps {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

@Injectable()
export class CriarUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    @Inject('CarteiraRepository') 
    private readonly carteiraRepository: CarteiraRepository,
    private readonly hashService: BcryptHashService,
  ) {}

  async execute(props: CriarUsuarioProps): Promise<UsuarioDto> {
    const usuarioExistente = await this.usuarioRepository.buscarPorEmail(
      props.email,
    );
    if (usuarioExistente) {
      throw new Error('Email já cadastrado');
    }

    const senhaHashed = await this.hashService.hash(props.senha);

    const usuario = Usuario.criar({
      ...props,
      senha: senhaHashed,
    });

    await this.usuarioRepository.salvar(usuario);

    const carteira = Carteira.criar({
      usuarioId: usuario.getId(), 
    });
    await this.carteiraRepository.salvar(carteira);

    return UsuarioMapper.DomainToDto(usuario);
  }
}