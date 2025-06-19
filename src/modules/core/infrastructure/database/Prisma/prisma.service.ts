import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../../../../../../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(config: ConfigService) {
    const dbUser = config.get<string>('DB_USER');
    const dbPassword = config.get<string>('DB_PASSWORD');
    const dbHost = config.get<string>('DB_HOST');
    const dbPort = config.get<string>('DB_PORT');
    const dbName = config.get<string>('DB_NAME');
    const dbSchema = config.get<string>('DB_SCHEMA');

    const databaseUrl = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?schema=${dbSchema}`;

    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });

  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
      this.logger.error('Falha ao conectar ao banco de dados', error);
      throw error; 
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Desconexão do banco de dados realizada com sucesso!');
    } catch (error) {
      this.logger.error('Falha ao desconectar do banco de dados', error);
    }
  }
}