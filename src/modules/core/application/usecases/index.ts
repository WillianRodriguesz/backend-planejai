import { AdicionarLancamentoUseCase } from './carteira/adicionar-lancamento.usecase';
import { AtualizarLancamentoUseCase } from './carteira/atualizar-lancamento.usecase';
import { DeletarLancamentoUseCase } from './carteira/deletar-lancamento.usecase';
import { CriarUsuarioUseCase } from './usuario/criar-usuario.usecase';
import { LoginUsuarioUseCase } from './usuario/login-usuario.usecase';

export const CoreUseCases = [
  AdicionarLancamentoUseCase,
  AtualizarLancamentoUseCase,
  DeletarLancamentoUseCase,

  CriarUsuarioUseCase,
  LoginUsuarioUseCase,
];
