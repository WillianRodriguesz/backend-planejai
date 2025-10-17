import { Provider } from '@nestjs/common';
import { CarteiraRepositoryImpl } from './carteira.repository';
import { CategoriaRepositoryImpl } from './categoria.repository';

export const CoreRepositories: Provider[] = [
  CarteiraRepositoryImpl,
  CategoriaRepositoryImpl,
];
