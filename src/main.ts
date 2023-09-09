import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  app.use('/uploads', express.static('uploads'))

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
  )
    app.setGlobalPrefix('api')

  await app.listen(3001);
}
bootstrap();
