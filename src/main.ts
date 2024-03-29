import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as express from 'express'
import {ValidationPipe} from "@nestjs/common";
import {join} from "path";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors()

    app.use('/uploads', express.static('uploads'))

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api')

    app.use('/uploads', express.static('uploads'))

    await app.listen(process.env.PORT);
}

bootstrap();
