import { Provider } from '@nestjs/common';
import { CarteiraRepositoryImpl } from './carteira.repository';
import { CategoriaRepositoryImpl } from './categoria.repository';
import { UsuarioRepositoryImpl } from './usuario.repository';

export const CoreRepositories: Provider[] = [
  CarteiraRepositoryImpl,
  CategoriaRepositoryImpl,
  UsuarioRepositoryImpl,
];
