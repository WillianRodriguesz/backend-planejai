import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/modules/core/infrastructure/database/Prisma/prisma.module';
import { UsuarioControle } from './controllers/usuario.controller';
import { UsuarioRepositories } from './infrastructure/repositories';
import { UsuarioUseCases } from './application/usecases/usuario';



@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
    }),

    PrismaModule,
  ],
  controllers: [UsuarioControle],
  providers: [...UsuarioRepositories, ...UsuarioUseCases],

})
export class CoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply().forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}
