import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CreatureModule } from './creature/creature.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      synchronize: true
  }),
      CreatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
