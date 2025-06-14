import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/modules/core/infrastructure/database/Prisma/prisma.module';
import { UsuarioControle } from './controllers/usuario.controller';
import { CoreRepositories} from './infrastructure/repositories';
import { CoreUseCases } from './application/usecases';
import { CoreMappers } from './infrastructure/mapper';
import { CoreControllers } from './controllers';



@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
    }),

    PrismaModule,
  ],
  controllers: [...CoreControllers],
  providers: [...CoreRepositories, ...CoreUseCases, ...CoreMappers],

})
export class CoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply().forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}
