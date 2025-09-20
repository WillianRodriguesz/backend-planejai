import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { CarteiraModel, CategoriaModel, LancamentoModel, OrcamentoModel, UsuarioModel } from '../modules/core/infrastructure/models';


dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  synchronize: false, // Não usar em produção
  logging: false,
  entities: [UsuarioModel, CarteiraModel, CategoriaModel, LancamentoModel, OrcamentoModel],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscriber/*.ts'],
});
