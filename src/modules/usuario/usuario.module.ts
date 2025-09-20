import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database';

@Module({
  imports: [
    DatabaseModule, // Importa o módulo compartilhado de database
  ],
  // ... outros imports, controllers, providers
})
export class UsuarioModule {}
