import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './modules/core/core.module';
// import { UsuarioModule } from './modules/usuario/usuario.module'; // Descomente quando implementar

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CoreModule,
    // UsuarioModule, // Descomente quando implementar
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
