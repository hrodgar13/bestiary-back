import { Injectable } from '@nestjs/common';
import {CreaturePayloadDto} from "../../dtos/income/creature.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Creature} from "../../entities/creature.entity";
import {Column, ManyToOne, OneToMany, OneToOne, Repository} from "typeorm";
import {Translation} from "../../entities/translations/translation.entity";
import {Alignment} from "../../entities/attributes/alignment.entity";
import {Type} from "../../entities/attributes/type.entity";
import {Size} from "../../entities/attributes/size.entity";
import {ArmorTag} from "../../entities/attributes/armor-tag.entity";
import {ImmunitiesDamageMeasure} from "../../entities/attribute-measure/immunities-damage-measure.entity";
import {MultiFieldsENUM, MutliSelectDto} from "../../dtos/income/attribute-measure/mutli-select.dto";
import {VulnerabilitiesDamageMeasure} from "../../entities/attribute-measure/vulnerabilities-damage-measure.entity";
import {ResistsDamageMeasure} from "../../entities/attribute-measure/resists-damage-measure.entity";
import {SpeedsMeasure} from "../../entities/attribute-measure/speeds-measure.entity";
import {FeelingsMeasure} from "../../entities/attribute-measure/feelings-measure.entity";
import {SavingThrowMeasure} from "../../entities/attribute-measure/saving-throw-measure.entity";
import {SkillsMeasure} from "../../entities/attribute-measure/skills.measure";
import {ConditionsMeasure} from "../../entities/attribute-measure/conditions-measure.entity";
import {LanguagesMeasure} from "../../entities/attribute-measure/languages.measure";
import {RegionsMeasure} from "../../entities/attribute-measure/regions-measure.entity";
import {Ability} from "../../entities/actions-abilities/abilities.entity";
import {ActionsAbilitiesENUM} from "../../dtos/income/actions/action-ability-block.dto";
import {Action} from "../../entities/actions-abilities/action.entity";
import {BonusAction} from "../../entities/actions-abilities/bonus-action.entity";
import {LegendaryAction} from "../../entities/actions-abilities/legendary-action.entity";

@Injectable()
export class CreatureService {

    constructor(
        @InjectRepository(Creature) private creatureRepo: Repository<Creature>
    ) {
    }

    createCreature(userId: any, body: CreaturePayloadDto) {
        console.log(userId, body)

        let creature = this.creatureRepo.create()
        
        
        creature = this.assetMultiselectData(creature, body.multiSelects)
    }

    private assetMultiselectData(creature: Creature, multiSelects: MutliSelectDto) {
        return undefined;
    }
}
