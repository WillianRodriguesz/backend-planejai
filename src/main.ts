import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { webcrypto } from 'crypto';
import { DomainExceptionFilter } from './common/filters/domain-exception.filter';
import { RepositoryExceptionFilter } from './common/filters/repository-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cookieParser = require('cookie-parser');

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

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Planejai API')
    .setDescription(
      'Documentação da API do Planejai - Clean Architecture e DDD',
    )
    .setVersion('1.0')
    .addTag('auth', 'Endpoints de autenticação')
    .addTag('usuarios', 'Gerenciamento de usuários')
    .addTag('categorias', 'Gerenciamento de categorias')
    .addTag('carteiras', 'Gerenciamento de carteiras')
    .addCookieAuth('access_token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
