import { Provider } from '@nestjs/common';
import { UsuarioRepositoryImpl } from './usuario.repository'; 

export const UsuarioRepositories: Provider[] = [
  {
    provide: 'UsuarioRepository',
    useClass: UsuarioRepositoryImpl,
  },
];