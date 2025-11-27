import { Injectable } from '@nestjs/common';
import {
  AuthService,
  LoginResultado,
} from '../../../infrastructure/services/auth.service';

export type LoginUsuarioInput = {
  telefone: string;
  senha: string;
};

@Injectable()
export class LoginUsuarioUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(input: LoginUsuarioInput): Promise<LoginResultado> {
    const { telefone, senha } = input;
    return this.authService.loginPorTelefone(telefone, senha);
  }
}
