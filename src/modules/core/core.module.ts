import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../shared/infrastructure/database';
import { CoreUseCases } from './application/usecases';
import { CoreQueries } from './application/queries';
import { CoreRepositories } from './infrastructure/repositories';
import { CoreControllers } from './controllers';
import { BcryptHashService } from './infrastructure/services/hash-bcrypt.service';
import { AuthService } from './infrastructure/services/auth.service';
import { UsuarioCredenciaisRepositoryImpl } from './infrastructure/repositories/usuario.repository';
import { UsuarioWriteRepositoryImpl } from './infrastructure/services/criar-usuario.service';
import { CriarUsuarioUseCase } from './application/usecases/usuario/criar-usuario.usecase';
import { UsuarioModel } from './infrastructure/models/usuario.model';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UsuarioModel])],
  controllers: [...CoreControllers],
  providers: [
    ...CoreUseCases,
    ...CoreRepositories,
    { provide: 'HashService', useClass: BcryptHashService },
    AuthService,
    ...CoreQueries,
    ...CoreRepositories,
    {
      provide: 'UsuariosCredenciaisRepository',
      useClass: UsuarioCredenciaisRepositoryImpl,
    },
    { provide: 'UsuarioWriteRepository', useClass: UsuarioWriteRepositoryImpl },
    CriarUsuarioUseCase,
  ],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
