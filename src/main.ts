import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { webcrypto } from 'crypto';
import { DomainExceptionFilter } from './common/filters/domain-exception.filter';
import { RepositoryExceptionFilter } from './common/filters/repository-exception.filter';

if (!globalThis.crypto) {
  (globalThis as any).crypto = webcrypto;
}

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('planejai');

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalFilters(
    new DomainExceptionFilter(),
    new RepositoryExceptionFilter(),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
