import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as express from 'express'
import {ValidationPipe} from "@nestjs/common";
import {join} from "path";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: [
            'http://localhost:4200',
            'http://viribus-unitis-stage.uk.to',
            'http://viribus-unitis.uk.to'
        ],
        methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
        credentials: true,
    })

    app.use('/uploads', express.static('uploads'))

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api')

    app.use('/uploads', express.static('uploads'))


    await app.listen(process.env.PORT);
}

bootstrap();
