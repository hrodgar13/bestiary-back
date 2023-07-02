import {IsArray, IsNumber} from "class-validator";

export class CreateAdditionsCreatureDto {
    @IsNumber()
    creature_size_id: number

    @IsNumber()
    creature_type_id: number

    @IsNumber()
    creature_aligment_id: number

    @IsNumber()
    armor_type_id: number

    @IsNumber()
    creature_stat_block: number

    @IsArray()
    creature_skill: number[];

    @IsArray()
    creature_speeds: number[];

    @IsArray()
    creature_saving_throws: number[];

    @IsArray()
    creature_vulnerabilities: number[];

    @IsArray()
    creature_resistances: number[];

    @IsArray()
    creature_immunities: number[];

    @IsArray()
    creature_statement_immunities: number[]

    @IsArray()
    creature_feels: number[];

    @IsArray()
    creature_languages: number[];

    @IsArray()
    creature_abilities: number[];

    @IsArray()
    creature_actions: number[];

    @IsArray()
    creature_bonus_actions: number[];

    @IsArray()
    creature_legendary_actions: number[];
}