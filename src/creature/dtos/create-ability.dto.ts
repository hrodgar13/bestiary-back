import {IsString} from "class-validator";

export class CreateAbilityDto {
    @IsString()
    title_UA: string

    @IsString()
    title_EN: string

    @IsString()
    ability_UA: string

    @IsString()
    ability_EN: string
}