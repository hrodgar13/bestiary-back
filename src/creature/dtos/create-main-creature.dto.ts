import {Allow, IsArray, IsBoolean, IsNumber, IsObject, IsString, ValidateIf} from "class-validator";
import {StatBlock} from "../entities/stat-block.entity";
import {SpeedModifier} from "../entities/speed-modifier.entity";
import {SavingThrowModifier} from "../entities/saving-throw-modifier.entity";
import {FeelModifiers} from "../entities/feels-modifier.entity";
import {
    FeelModifiersDto,
    SavingThrowModifierDto,
    SkillModifierDto,
    SpeedModifierDto,
    StatBlockDto
} from "./modifiers.dto";
import {ActionsDto} from "./actions.dto";
import {CreateAbilityDto} from "./create-ability.dto";

export class CreateMainCreatureDto {
    @IsBoolean()
    isFinished: boolean

    @IsString()
    @ValidateIf((object, value) => value !== null)
    creature_name_EN: string | null

    @IsString()
    @ValidateIf((object, value) => value !== null)
    creature_name_UA: string | null

    @IsString()
    @ValidateIf((object, value) => value !== null)
    creature_name_tag: string | null

    @IsArray()
    @ValidateIf((object, value) => value !== null)
    images: number[] | null

    @ValidateIf((object, value) => value !== null)
    @Allow(null)
    creature_size: number | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_type: number | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_alignment: number | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    armor_Class: number | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    armor_type: number | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    hit_points: string | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    hit_points_by_dices: string | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_speeds: SpeedModifierDto[] | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_stat_block: StatBlockDto | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_saving_throws: SavingThrowModifierDto[] | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_skills: SkillModifierDto[] | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_vulnerability: number[] | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_resistance: number[] | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_immunity: number[] | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_statement_immunity: number[] | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_feels: FeelModifiersDto[] | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_languages: number[] | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_danger_level: number | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_exp_amount: number | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_mastery_bonus: number | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_abilities: CreateAbilityDto[] | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_actions: ActionsDto[] | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_bonus_action: ActionsDto[] | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_legendary_action: ActionsDto[] | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_description_EN: string | null

    @Allow(null)
    @ValidateIf((object, value) => value !== null)
    creature_description_UA: string | null
}