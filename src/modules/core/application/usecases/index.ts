import { AdicionarLancamentoUseCase } from './carteira/adicionar-lancamento.usecase';
import { AtualizarLancamentoUseCase } from './carteira/atualizar-lancamento.usecase';
import { DeletarLancamentoUseCase } from './carteira/deletar-lancamento.usecase';
import { CriarUsuarioUseCase } from './usuario/criar-usuario.usecase';
import { LoginUsuarioUseCase } from './usuario/login-usuario.usecase';
import { AtualizarUsuarioUseCase } from './usuario/atualizar-usuario.usecase';
import { DeletarUsuarioUseCase } from './usuario/deletar-usuario.usecase';
import { BuscarUsuarioPorIdUseCase } from './usuario/buscar-usuario-por-id.usecase';
import { BuscarUsuarioUseCase } from './usuario/buscar-usuario.usecase';
import { TrocarSenhaUseCase } from './usuario/trocar-senha.usecase';
import { AtualizarAvatarUseCase } from './usuario/atualizar-avatar.usecase';
import { VerificarEmailUseCase } from './usuario/verificar-email.usecase';
import { ReenviarCodigoUseCase } from './usuario/reenviar-codigo.usecase';
import { SolicitarRedefinicaoSenhaUseCase } from './usuario/solicitar-redefinicao-senha.usecase';
import { RedefinirSenhaUseCase } from './usuario/redefinir-senha.usecase';

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
  TrocarSenhaUseCase,
  AtualizarAvatarUseCase,
  VerificarEmailUseCase,
  ReenviarCodigoUseCase,
  SolicitarRedefinicaoSenhaUseCase,
  RedefinirSenhaUseCase,
];
