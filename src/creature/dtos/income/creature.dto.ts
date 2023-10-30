import {MutliSelectDto} from "./attribute-measure/mutli-select.dto";
import {AttributeTranslationDto} from "./attributeTranslation.dto";
import {ActionsAndAbilitiesAmount} from "./actions/action-ability-block.dto";
import {Expose, Type} from "class-transformer";

export class CreaturePayloadDto {
    @Expose()
    isFinished: boolean;
    @Expose()
    creatureName?: AttributeTranslationDto;
    @Expose()
    alignment?: number;
    @Expose()
    type?: number;
    @Expose()
    size?: number;
    @Expose()
    armorClass?: number
    @Expose()
    armorTag?: number
    @Expose()
    hits?: number
    @Expose()
    hitsInDice?: string
    @Expose()
    strength?: number
    @Expose()
    dexterity?: number
    @Expose()
    construction?: number
    @Expose()
    intelligence?: number
    @Expose()
    wisdom?: number
    @Expose()
    charisma?: number
    @Expose()
    multiSelects: MutliSelectDto
    @Expose()
    dangerLevel?: number
    @Expose()
    experience?: string
    @Expose()
    masteryBonus?: number
    @Expose()
    actionsAbilities: ActionsAndAbilitiesAmount
    @Expose()
    description?: AttributeTranslationDto
}