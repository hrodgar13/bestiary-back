import {Module} from "@nestjs/common";
import {CreatureController} from "./controllers/creature.controller";
import {CreatureService} from "./services/creature.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Creature} from "./entities/creature.entity";
import {Ability} from "./entities/abilities.entity";
import {Action} from "./entities/action.entity";
import {Aligment} from "./entities/aligment.entity";
import {ArmorClass} from "./entities/armor-class.entity";
import {DamageType} from "./entities/damage-type.entity";
import {FeelModifiers} from "./entities/feels-modifier.entity";
import {Images} from "./entities/images.entity";
import {Language} from "./entities/language.entity";
import {SavingThrowModifier} from "./entities/saving-throw-modifier.entity";
import {Size} from "./entities/size.entity";
import {SkillModifier} from "./entities/skill-modifier.entity";
import {SpeedModifier} from "./entities/speed-modifier.entity";
import {StatBlock} from "./entities/stat-block.entity";
import {Statement} from "./entities/statement.entity";
import {Type} from "./entities/type.entity";
import {UploadCreatureImageController} from "./controllers/upload-creature-image.controller";
import {ImageUploadService} from "./services/image-upload.service";
import {Feel} from "./entities/feel.entity";
import {SavingThrow} from "./entities/saving-throw.entity";
import {Skill} from "./entities/skill.entity";
import {Speed} from "./entities/speed.entity";
import {AdditionService} from "./services/addition.service";
import {
  AlignmentController,
  ArmorClassController, DamageTypeController,
  FeelController, LanguageController, SavingThrowController,
  SizeController, SkillController, SpeedController, StatementController, TypeController
} from "./controllers/adittions.controllers";

@Module({
  controllers: [CreatureController, UploadCreatureImageController, SizeController, AlignmentController, ArmorClassController, FeelController, LanguageController, SavingThrowController, SkillController, SpeedController, StatementController, DamageTypeController, TypeController],
  providers: [CreatureService, ImageUploadService, AdditionService],
  exports: [CreatureService],
  imports: [TypeOrmModule.forFeature([Ability, Action, Aligment, ArmorClass, Creature, DamageType, FeelModifiers, Images, Language, SavingThrowModifier, Size, SkillModifier, SpeedModifier, StatBlock, Statement, Type, Feel, SavingThrow, Skill, Speed])]
})
export class CreatureModule {}
