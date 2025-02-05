import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const debug = require('debug')('Donation:server');


async function bootstrap() {
  debug("This will only log when 'npm run debug' is used.");
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
