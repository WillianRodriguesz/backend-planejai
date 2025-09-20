import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../../shared/infrastructure/database';
import { CoreUseCases } from './application/usecases';
import { CoreMappers } from './infrastructure/mapper';
import { CoreControllers } from './controllers';
import { BcryptHashService } from './infrastructure/services/hash-bcrypt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    DatabaseModule,
  ],
  controllers: [...CoreControllers],
  providers: [
    ...CoreUseCases,
    ...CoreMappers,
    {
      provide: 'HashService',
      useClass: BcryptHashService,
    },
  ],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
