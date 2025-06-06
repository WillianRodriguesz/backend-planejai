import { LoginUsuarioUseCase } from 'src/modules/core/application/usecases/usuario/login-usuario.usecase';
import { CriarUsuarioUseCase } from './criar-usuario.usecase';
import { DeletarUsecase } from './deletar-usuario.usecase';
import { ExisteIdUsecase } from './existeId-usuario.usecase';
import { ListarTodosUseCase } from './listar-usuarios.usecase';

export const UsuarioUseCases = [
  CriarUsuarioUseCase,
  ListarTodosUseCase,
  DeletarUsecase,
  ExisteIdUsecase,
  LoginUsuarioUseCase,
];
