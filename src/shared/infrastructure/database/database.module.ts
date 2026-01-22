import { webcrypto } from 'crypto';

// Polyfill para crypto.randomUUID no Node.js 18
if (!globalThis.crypto) {
  (globalThis as any).crypto = webcrypto;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import {
  UsuarioModel,
  CarteiraModel,
  CategoriaModel,
  LancamentoModel,
  SaldoMensalModel,
  TermoModel,
  UsuarioConsentimentoModel,
} from '../../../modules/core/infrastructure/models/index';

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
          TermoModel,
          UsuarioConsentimentoModel,
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
      TermoModel,
      UsuarioConsentimentoModel,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
