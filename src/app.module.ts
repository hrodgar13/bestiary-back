import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatureModule } from './creature/creature.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { Alignment } from './creature/entities/attributes/alignment.entity';
import { Type } from './creature/entities/attributes/type.entity';
import { Translation } from './creature/entities/translations/translation.entity';
import { Size } from './creature/entities/attributes/size.entity';
import { ArmorTag } from './creature/entities/attributes/armor-tag.entity';
import { Speed } from './creature/entities/attributes/speed.entity';
import { Damage } from './creature/entities/attributes/damage.entity';
import { Feeling } from './creature/entities/attributes/feeling.entity';
import { SavingThrow } from './creature/entities/attributes/saving-throw.entity';
import { Skill } from './creature/entities/attributes/skill.entity';
import { Condition } from './creature/entities/attributes/condition.entity';
import { Language } from './creature/entities/attributes/language.entity';
import { Region } from './creature/entities/attributes/region.entity';

@Module({
  imports: [
    CreatureModule,
    AuthModule,
    MulterModule.register({ dest: './uploads' }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ViribusUnitis.sqlite',
      entities: [
        User,
        Type,
        Alignment,
        Size,
        ArmorTag,
        Speed,
        Damage,
        Feeling,
        SavingThrow,
        Skill,
        Condition,
        Language,
        Translation,
        Region,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
