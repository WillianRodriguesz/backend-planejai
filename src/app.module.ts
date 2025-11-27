import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './modules/core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => {
        const rawSecret = config.get<string>('JWT_SECRET');
        const secret =
          rawSecret && rawSecret.trim().length > 0 ? rawSecret.trim() : 'dev-secret';
        const rawExp = config.get<string>('JWT_EXPIRES');
        const expiresIn: JwtSignOptions['expiresIn'] =
          rawExp && rawExp.trim().length > 0
            ? (rawExp.trim() as JwtSignOptions['expiresIn'])
            : ('1d' as JwtSignOptions['expiresIn']);
        return {
          secret,
          signOptions: { expiresIn },
        };
      },
    }),
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}