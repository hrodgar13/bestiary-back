import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Type } from './entities/attributes/type.entity';
import { Alignment } from './entities/attributes/alignment.entity';
import { Translation } from './entities/translations/translation.entity';
import { AlignmentController } from './controllers/attributes-controllers/alignment/alignment.controller';
import { AdditionService } from './services/addition/addition.service';
import { TypeController } from './controllers/attributes-controllers/type/type.controller';
import { SizeController } from './controllers/attributes-controllers/size/size.controller';
import { ArmorTagController } from './controllers/attributes-controllers/armor-tag/armor-tag.controller';
import { SpeedController } from './controllers/attributes-controllers/speed/speed.controller';
import { DamageController } from './controllers/attributes-controllers/damage/damage.controller';
import { SavingThrowController } from './controllers/attributes-controllers/saving-throw/saving-throw.controller';
import { ConditionController } from './controllers/attributes-controllers/condition/condition.controller';
import { FeelController } from './controllers/attributes-controllers/feel/feel.controller';
import { LanguageController } from './controllers/attributes-controllers/language/language.controller';
import { Size } from './entities/attributes/size.entity';
import { ArmorTag } from './entities/attributes/armor-tag.entity';
import { Speed } from './entities/attributes/speed.entity';
import { Damage } from './entities/attributes/damage.entity';
import { Feeling } from './entities/attributes/feeling.entity';
import { SavingThrow } from './entities/attributes/saving-throw.entity';
import { Skill } from './entities/attributes/skill.entity';
import { Condition } from './entities/attributes/condition.entity';
import { Language } from './entities/attributes/language.entity';
import { SkillController } from './controllers/attributes-controllers/skill/skill.controller';
import { Region } from './entities/attributes/region.entity';
import { RegionController } from './controllers/attributes-controllers/region/region.controller';

@Module({
  controllers: [
    AlignmentController,
    TypeController,
    SizeController,
    ArmorTagController,
    SpeedController,
    DamageController,
    SavingThrowController,
    ConditionController,
    FeelController,
    SkillController,
    LanguageController,
    RegionController,
  ],
  providers: [AdditionService],
  exports: [],
  imports: [
    TypeOrmModule.forFeature([
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
    ]),
  ],
})
export class CreatureModule {}
