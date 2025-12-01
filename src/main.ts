import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { webcrypto } from 'crypto';
import { DomainExceptionFilter } from './common/filters/domain-exception.filter';
import { RepositoryExceptionFilter } from './common/filters/repository-exception.filter';

// Polyfill para crypto.randomUUID no Node.js 18
if (!globalThis.crypto) {
  (globalThis as any).crypto = webcrypto;
}

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('planejai');

  // Registrar filtros de exceções globalmente
  app.useGlobalFilters(
    new DomainExceptionFilter(),
    new RepositoryExceptionFilter(),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
