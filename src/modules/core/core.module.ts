import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from '../../shared/infrastructure/auth/auth.module';
import { DatabaseModule } from '../../shared/infrastructure/database';
import { CoreQueries } from './application/queries';
import { CoreUseCases } from './application/usecases';
import { CoreControllers } from './controllers';
import { CarteiraRepositoryImpl } from './infrastructure/repositories/carteira.repository';
import { CategoriaRepositoryImpl } from './infrastructure/repositories/categoria.repository';
import { TermoRepositoryImpl } from './infrastructure/repositories/termo.repository';
import { UsuarioRepositoryImpl } from './infrastructure/repositories/usuario.repository';
import { EmailServiceImpl } from './infrastructure/services/email.service';
import { BcryptHashServiceImpl } from './infrastructure/services/hash-bcrypt.service';
import { LimpezaCodigosService } from './infrastructure/services/limpeza-codigos.service';
import { TokenServiceImpl } from './infrastructure/services/token.service';
import { UsuarioConsentimentoRepositoryImpl } from './infrastructure/repositories/usuario-consentimento.repository';

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
      provide: 'CategoriaRepository',
      useClass: CategoriaRepositoryImpl,
    },
    {
      provide: 'TermoRepository',
      useClass: TermoRepositoryImpl,
    },
    {
      provide: 'UsuarioConsentimentoRepository',
      useClass: UsuarioConsentimentoRepositoryImpl,
    },
    {
      provide: 'EmailService',
      useClass: EmailServiceImpl,
    },
    {
      provide: 'BcryptHashService',
      useClass: BcryptHashServiceImpl,
    },
    {
      provide: 'TokenService',
      useClass: TokenServiceImpl,
    },
    LimpezaCodigosService,
  ],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
