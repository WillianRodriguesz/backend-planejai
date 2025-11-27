import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { webcrypto } from 'crypto';
import * as cookieParser from 'cookie-parser';


// Polyfill para crypto.randomUUID no Node.js 18
if (!globalThis.crypto) {
  (globalThis as any).crypto = webcrypto;
}

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('planejai');
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
