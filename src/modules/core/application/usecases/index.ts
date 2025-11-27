import { AdicionarLancamentoUseCase } from './carteira/adicionar-lancamento.usecase';
import { CriarUsuarioUseCase } from './usuario/criar-usuario.usecase';
import { LoginUsuarioUseCase } from './usuario/login-usuario.usecase';

export const CoreUseCases = [
  AdicionarLancamentoUseCase,
  CriarUsuarioUseCase,
  LoginUsuarioUseCase,
];
