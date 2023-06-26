import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CreatureModule } from './creature/creature.module';
import {Creature} from "./creature/entities/creature.entity";
import {Images} from "./creature/entities/images.entity";
import {Size} from "./creature/entities/size.entity";
import {Type} from "./creature/entities/type.entity";
import {Aligment} from "./creature/entities/aligment.entity";
import {ArmorClass} from "./creature/entities/armor-class.entity";
import {Speed} from "./creature/entities/speed.entity";
import {StatBlock} from "./creature/entities/stat-block.entity";
import {SavingThrow} from "./creature/entities/saving-throw.entity";
import {Skill} from "./creature/entities/skill.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ViribusUnitis.sqlite',
      entities: [Creature, Images, Size, Type, Aligment, ArmorClass, Speed, StatBlock, SavingThrow, Skill],
      synchronize: true
  }),
      CreatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
