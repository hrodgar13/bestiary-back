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
import {Speed} from "./entities/speed.entity";
import {StatBlock} from "./entities/stat-block.entity";
import {Statement} from "./entities/statement.entity";
import {Type} from "./entities/type.entity";
import {UploadCreatureImageController} from "./controllers/upload-creature-image.controller";
import {ImageUploadService} from "./services/image-upload.service";
import {CreatureElementsController} from "./controllers/creature-elements.controller";
import {ElementsService} from "./services/elements.service";
import {Feel} from "./entities/feel.entity";

@Module({
  controllers: [CreatureController, UploadCreatureImageController, CreatureElementsController],
  providers: [CreatureService, ImageUploadService, ElementsService],
  exports: [CreatureService],
  imports: [TypeOrmModule.forFeature([Creature, Ability, Action, Aligment, ArmorClass, Creature, DamageType, FeelModifiers, Images, Language, SavingThrowModifier, Size, SkillModifier, Speed, StatBlock, Statement, Type, Feel])]
})
export class CreatureModule {}
