import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import {
  UsuarioModel,
  CarteiraModel,
  CategoriaModel,
  LancamentoModel,
  SaldoMensalModel,
} from '../../../modules/core/infrastructure/models';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        schema: configService.get('DB_SCHEMA'),
        entities: [
          UsuarioModel,
          CarteiraModel,
          CategoriaModel,
          LancamentoModel,
          SaldoMensalModel,
        ],
        synchronize: false, // Sempre false em produção
        logging: true,
        migrations: ['dist/migrations/*.js'],
        migrationsRun: false,
      }),
    }),
    TypeOrmModule.forFeature([
      UsuarioModel,
      CarteiraModel,
      CategoriaModel,
      LancamentoModel,
      SaldoMensalModel,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
