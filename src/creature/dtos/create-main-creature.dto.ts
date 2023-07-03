import {IsNumber, IsString, Max, Min} from "class-validator";

export class CreateMainCreatureDto {
    @IsString()
    creature_name: string

    @IsString()
    creature_name_tag: string

    @IsNumber()
    @Min(0)
    @Max(50)
    armor_Class: number

    @IsNumber()
    @Min(0)
    hit_points: number

    @IsString()
    hit_points_by_dices: string

    @IsNumber()
    @Min(0)
    creature_danger_level: number

    @IsNumber()
    @Min(0)
    creature_exp_amount: number

    @IsNumber()
    @Min(2)
    creature_mastery_bonus: number

    @IsString()
    creature_description: string

    @IsNumber()
    creatureSizeIdId: number

    @IsNumber()
    creatureTypeIdId: number

    @IsNumber()
    creatureAligmentIdId: number

    @IsNumber()
    armorTypeIdId: number

    @IsNumber()
    creatureStatBlockId: number
}