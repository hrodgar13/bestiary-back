import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {Type} from './entities/attributes/type.entity';
import {Alignment} from './entities/attributes/alignment.entity';
import {Translation} from './entities/translations/translation.entity';
import {AlignmentController} from './controllers/attributes-controllers/alignment/alignment.controller';
import {AdditionService} from './services/addition/addition.service';
import {TypeController} from './controllers/attributes-controllers/type/type.controller';
import {SizeController} from './controllers/attributes-controllers/size/size.controller';
import {ArmorTagController} from './controllers/attributes-controllers/armor-tag/armor-tag.controller';
import {SpeedController} from './controllers/attributes-controllers/speed/speed.controller';
import {DamageController} from './controllers/attributes-controllers/damage/damage.controller';
import {SavingThrowController} from './controllers/attributes-controllers/saving-throw/saving-throw.controller';
import {ConditionController} from './controllers/attributes-controllers/condition/condition.controller';
import {FeelController} from './controllers/attributes-controllers/feel/feel.controller';
import {LanguageController} from './controllers/attributes-controllers/language/language.controller';
import {Size} from './entities/attributes/size.entity';
import {ArmorTag} from './entities/attributes/armor-tag.entity';
import {Speed} from './entities/attributes/speed.entity';
import {Damage} from './entities/attributes/damage.entity';
import {Feeling} from './entities/attributes/feeling.entity';
import {SavingThrow} from './entities/attributes/saving-throw.entity';
import {Skill} from './entities/attributes/skill.entity';
import {Condition} from './entities/attributes/condition.entity';
import {Language} from './entities/attributes/language.entity';
import {SkillController} from './controllers/attributes-controllers/skill/skill.controller';
import {Region} from './entities/attributes/region.entity';
import {RegionController} from './controllers/attributes-controllers/region/region.controller';
import {ConditionsMeasure} from './entities/attribute-measure/conditions-measure.entity';
import {FeelingsMeasure} from './entities/attribute-measure/feelings-measure.entity';
import {ImmunitiesDamageMeasure} from './entities/attribute-measure/immunities-damage-measure.entity';
import {LanguagesMeasure} from './entities/attribute-measure/languages.measure';
import {ResistsDamageMeasure} from './entities/attribute-measure/resists-damage-measure.entity';
import {SavingThrowMeasure} from './entities/attribute-measure/saving-throw-measure.entity';
import {SkillsMeasure} from './entities/attribute-measure/skills.measure';
import {SpeedsMeasure} from './entities/attribute-measure/speeds-measure.entity';
import {VulnerabilitiesDamageMeasure} from './entities/attribute-measure/vulnerabilities-damage-measure.entity';
import {Ability} from './entities/actions-abilities/abilities.entity';
import {Action} from './entities/actions-abilities/action.entity';
import {BonusAction} from './entities/actions-abilities/bonus-action.entity';
import {LegendaryAction} from './entities/actions-abilities/legendary-action.entity';
import {Creature} from './entities/creature.entity';
import {RegionsMeasure} from './entities/attribute-measure/regions-measure.entity';
import {CreatureController} from "./controllers/creature/creature.controller";
import {CreatureService} from "./services/creature/creature.service";

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
        CreatureController
    ],
    providers: [
        AdditionService,
        CreatureService
    ],
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
        ]),
    ],
})
export class CreatureModule {
}
