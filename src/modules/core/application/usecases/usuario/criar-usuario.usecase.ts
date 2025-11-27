import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { UsuarioWriteRepository } from '../../../domain/repositories/Usuario.repository';
import { BcryptHashService } from '../../../infrastructure/services/hash-bcrypt.service';

export type CriarUsuarioInput = {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
};

@Injectable()
export class CriarUsuarioUseCase {
  constructor(
    @Inject('UsuarioWriteRepository')
    private readonly usuarioWriteRepo: UsuarioWriteRepository,
    @Inject('HashService') private readonly hashService: BcryptHashService,
  ) {}

  async execute(input: CriarUsuarioInput) {
    const nome = (input.nome ?? '').trim();
    const email = (input.email ?? '').trim();
    const telefone = (input.telefone ?? '').trim();
    const senha = (input.senha ?? '').trim();

    if (!nome || !email || !telefone || !senha) {
      throw new BadRequestException('Dados obrigatórios ausentes');
    }

    const exists = await this.usuarioWriteRepo.existsByTelefone(telefone);
    if (exists) {
      throw new BadRequestException('Telefone já cadastrado');
    }

    const senhaHash = await this.hashService.hash(senha);
    return this.usuarioWriteRepo.createUsuario({
      nome,
      email,
      telefone,
      senha: senhaHash,
    });
  }
}
