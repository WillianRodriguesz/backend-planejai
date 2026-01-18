import { Provider } from '@nestjs/common';
import { CategoriaRepositoryImpl } from './categoria.repository';
import { UsuarioRepositoryImpl } from './usuario.repository';
import { CarteiraRepositoryImpl } from './carteira.repository';

export const CoreRepositories: Provider[] = [
  CarteiraRepositoryImpl,
  CategoriaRepositoryImpl,
  UsuarioRepositoryImpl,
];
