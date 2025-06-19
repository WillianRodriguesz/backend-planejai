import { Inject, Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository.interface';
import { Usuario } from '../../../domain/entities/usuario.entity';
import { UsuarioDto } from '../../dtos/usuario/usuario.dto';
import { UsuarioMapper } from '../../mappers/usuario.mapper';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository.interface';
import { Carteira } from 'src/modules/core/domain/entities/carteira.entity';
import { BcryptHashService } from 'src/modules/core/infrastructure/services/hash-bcrypt.service';

export interface UsuarioUsecaseProps {
  nome: string;
  email: string;
  senha: string;
}

type UsuarioResult = UsuarioDto;

@Injectable()
export class CriarUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    @Inject('CarteiraRepository')
    private readonly carteiraRepository: CarteiraRepository,
    @Inject('HashService')
    private readonly hashService: BcryptHashService
  ) {}

  async execute(props: UsuarioUsecaseProps): Promise<UsuarioResult> {
    if (!props.nome || !props.email || !props.senha) {
      throw new Error('Nome, email e senha são obrigatórios');
    }
    const senhaHash = await this.hashService.hash(props.senha);
    
    if (!senhaHash) {
      throw new Error('Erro ao gerar hash da senha');
    }
    const usuarioDomain = Usuario.criar({
      nome: props.nome,
      email: props.email,
      senha: senhaHash,
    });

    const usuarioResult = await this.usuarioRepository.criar(usuarioDomain);

    if (!usuarioResult) {
      throw new Error('Erro ao criar usuário');
    }

    const novaCarteira = Carteira.criar({
      idUsuario: usuarioResult.getId(),
    });

    const carteiraResult = await this.carteiraRepository.criar(novaCarteira);

    if (!carteiraResult) {
      throw new Error('Erro ao criar carteira');
    }
    
    const usuarioDto = UsuarioMapper.domainToDto(usuarioResult, carteiraResult);

    return usuarioDto;
  }
}
