import { Provider } from '@nestjs/common';
import { CategoriaRepositoryImpl } from './categoria.repository';
import { UsuarioRepositoryImpl } from './usuario.repository';
import { CarteiraRepositoryImpl } from './Carteira.repository';

export const CoreRepositories: Provider[] = [
  CarteiraRepositoryImpl,
  CategoriaRepositoryImpl,
  UsuarioRepositoryImpl,
];
