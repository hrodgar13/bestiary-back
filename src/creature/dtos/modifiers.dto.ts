import {IsNumber, IsString, Max, Min} from "class-validator";
import {Feel} from "../entities/feel.entity";

export class SpeedModifierDto {
    @IsNumber()
    speed_amount: number

    @IsNumber()
    speed_name_id: number
}
export class StatBlockDto {
    @IsNumber()
    @Min(1)
    @Max(30)
    strength

    @IsNumber()
    @Min(1)
    @Max(30)
    dexterity: number

    @IsNumber()
    @Min(1)
    @Max(30)
    construction: number

    @IsNumber()
    @Min(1)
    @Max(30)
    intelligence: number

    @IsNumber()
    @Min(1)
    @Max(30)
    wisdom: number

    @IsNumber()
    @Min(1)
    @Max(30)
    charisma: number
}

export class SavingThrowModifierDto {
    @IsNumber()
    saving_throw_name_id: number

    @IsNumber()
    modifier: number
}

export class SkillModifierDto {
    @IsNumber()
    skill_name_id: number

    @IsNumber()
    modifier: number
}

export class FeelModifiersDto {
    @IsNumber()
    feel_modifier: number;

    @IsString()
    feel_measure: string

    @IsNumber()
    feel_name: number
}