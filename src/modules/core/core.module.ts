import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DatabaseModule } from '../../shared/infrastructure/database';
import { AuthModule } from '../../shared/infrastructure/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CoreUseCases } from './application/usecases';
import { CoreQueries } from './application/queries';
import { CoreControllers } from './controllers';
import { BcryptHashService } from './infrastructure/services/hash-bcrypt.service';
import { EmailServiceImpl } from './infrastructure/services/email.service';
import { LimpezaCodigosService } from './infrastructure/services/limpeza-codigos.service';
import { UsuarioRepositoryImpl } from './infrastructure/repositories/usuario.repository';
import { CategoriaRepositoryImpl } from './infrastructure/repositories/categoria.repository';
import { CarteiraRepositoryImpl } from './infrastructure/repositories/Carteira.repository';

@Module({
  imports: [AuthModule, DatabaseModule, ScheduleModule.forRoot()],
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
    {
      provide: 'EmailService',
      useClass: EmailServiceImpl,
    },
    CarteiraRepositoryImpl,
    CategoriaRepositoryImpl,
    BcryptHashService,
    EmailServiceImpl,
    LimpezaCodigosService,
  ],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
