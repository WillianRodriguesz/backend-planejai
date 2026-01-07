import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import {
  UsuarioModel,
  CarteiraModel,
  CategoriaModel,
  LancamentoModel,
  SaldoMensalModel,
} from './src/modules/core/infrastructure/models/index';

config();

const configService = new ConfigService();

export default new DataSource({
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
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
