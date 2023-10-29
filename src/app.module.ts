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
import { ConditionsMeasure } from './creature/entities/attribute-measure/conditions-measure.entity';
import { FeelingsMeasure } from './creature/entities/attribute-measure/feelings-measure.entity';
import { ImmunitiesDamageMeasure } from './creature/entities/attribute-measure/immunities-damage-measure.entity';
import { LanguagesMeasure } from './creature/entities/attribute-measure/languages.measure';
import { ResistsDamageMeasure } from './creature/entities/attribute-measure/resists-damage-measure.entity';
import { SavingThrowMeasure } from './creature/entities/attribute-measure/saving-throw-measure.entity';
import { SkillsMeasure } from './creature/entities/attribute-measure/skills.measure';
import { SpeedsMeasure } from './creature/entities/attribute-measure/speeds-measure.entity';
import { VulnerabilitiesDamageMeasure } from './creature/entities/attribute-measure/vulnerabilities-damage-measure.entity';
import { Ability } from './creature/entities/actions-abilities/abilities.entity';
import { Action } from './creature/entities/actions-abilities/action.entity';
import { BonusAction } from './creature/entities/actions-abilities/bonus-action.entity';
import { LegendaryAction } from './creature/entities/actions-abilities/legendary-action.entity';
import { Creature } from './creature/entities/creature.entity';
import { RegionsMeasure } from './creature/entities/attribute-measure/regions-measure.entity';

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
        ConditionsMeasure,
        FeelingsMeasure,
        ImmunitiesDamageMeasure,
        LanguagesMeasure,
        ResistsDamageMeasure,
        SavingThrowMeasure,
        SkillsMeasure,
        SpeedsMeasure,
        VulnerabilitiesDamageMeasure,
        Ability,
        Action,
        BonusAction,
        LegendaryAction,
        Creature,
        RegionsMeasure,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
