import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { webcrypto } from 'crypto';
import { DomainExceptionFilter } from './common/filters/domain-exception.filter';
import { RepositoryExceptionFilter } from './common/filters/repository-exception.filter';
import * as cookieParser from 'cookie-parser';

if (!globalThis.crypto) {
  (globalThis as any).crypto = webcrypto;
}

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('planejai');

  app.enableCors({
    origin: true, // Aceita requisições de qualquer origem
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalFilters(
    new DomainExceptionFilter(),
    new RepositoryExceptionFilter(),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on: http://0.0.0.0:${port}`);
}
bootstrap();
