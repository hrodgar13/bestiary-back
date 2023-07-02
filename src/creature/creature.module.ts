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
import {SavingThrow} from "./entities/saving-throw.entity";
import {Size} from "./entities/size.entity";
import {Skill} from "./entities/skill.entity";
import {Speed} from "./entities/speed.entity";
import {StatBlock} from "./entities/stat-block.entity";
import {Statement} from "./entities/statement.entity";
import {Type} from "./entities/type.entity";

@Module({
  controllers: [CreatureController],
  providers: [CreatureService],
  exports: [CreatureService],
  imports: [TypeOrmModule.forFeature([Creature, Ability, Action, Aligment, ArmorClass, Creature, DamageType, FeelModifiers, Images, Language, SavingThrow, Size, Skill, Speed, StatBlock, Statement, Type])]
})
export class CreatureModule {}
