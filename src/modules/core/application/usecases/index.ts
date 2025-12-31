import { AdicionarLancamentoUseCase } from './carteira/adicionar-lancamento.usecase';
import { AtualizarLancamentoUseCase } from './carteira/atualizar-lancamento.usecase';
import { DeletarLancamentoUseCase } from './carteira/deletar-lancamento.usecase';
import { CriarUsuarioUseCase } from './usuario/criar-usuario.usecase';
import { LoginUsuarioUseCase } from './usuario/login-usuario.usecase';
import { AtualizarUsuarioUseCase } from './usuario/atualizar-usuario.usecase';
import { DeletarUsuarioUseCase } from './usuario/deletar-usuario.usecase';
import { BuscarUsuarioPorIdUseCase } from './usuario/buscar-usuario-por-id.usecase';
import { BuscarUsuarioUseCase } from './usuario/buscar-usuario.usecase';

export const CoreUseCases = [
  AdicionarLancamentoUseCase,
  AtualizarLancamentoUseCase,
  DeletarLancamentoUseCase,
  CriarUsuarioUseCase,
  LoginUsuarioUseCase,
  AtualizarUsuarioUseCase,
  DeletarUsuarioUseCase,
  BuscarUsuarioPorIdUseCase,
  BuscarUsuarioUseCase,
];
