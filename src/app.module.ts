import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CreatureModule } from './creature/creature.module';
import {Creature} from "./creature/entities/creature.entity";
import {Images} from "./creature/entities/images.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ViribusUnitis.sqlite',
      entities: [Creature, Images],
      synchronize: true
  }),
      CreatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
