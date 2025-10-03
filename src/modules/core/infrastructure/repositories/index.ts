import { Provider } from '@nestjs/common';
import { CarteiraRepositoryImpl } from './carteira.repository'; 

export const CoreRepositories: Provider[] = [
  CarteiraRepositoryImpl, 
];