import { Provider } from '@nestjs/common';
import { UsuarioRepositoryImpl } from './usuario.repository'; 
import { CarteiraRepositoryImpl } from './carteira.repository';

export const CoreRepositories: Provider[] = [
  {
    provide: 'UsuarioRepository',
    useClass: UsuarioRepositoryImpl,
  },
  {
    provide: 'CarteiraRepository',
    useClass: CarteiraRepositoryImpl,
  },
];