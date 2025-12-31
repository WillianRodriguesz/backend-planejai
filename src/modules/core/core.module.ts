import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DatabaseModule } from '../../shared/infrastructure/database';
import { AuthModule } from '../../shared/infrastructure/auth/auth.module';
import { CoreUseCases } from './application/usecases';
import { CoreQueries } from './application/queries';
import { CoreControllers } from './controllers';
import { BcryptHashService } from './infrastructure/services/hash-bcrypt.service';
import { UsuarioRepositoryImpl } from './infrastructure/repositories/usuario.repository';
import { CarteiraRepositoryImpl } from './infrastructure/repositories/carteira.repository';
import { CategoriaRepositoryImpl } from './infrastructure/repositories/categoria.repository';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [...CoreControllers],
  providers: [
    ...CoreUseCases,
    ...CoreQueries,
    {
      provide: 'UsuarioRepository',
      useClass: UsuarioRepositoryImpl,
    },
    {
      provide: 'CarteiraRepository',
      useClass: CarteiraRepositoryImpl,
    },
    CarteiraRepositoryImpl, 
    CategoriaRepositoryImpl,
    BcryptHashService,
  ],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
