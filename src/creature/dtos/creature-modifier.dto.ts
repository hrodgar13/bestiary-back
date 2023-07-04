import {IsNumber, IsString} from "class-validator";

export class CreateFeelModifiersDto {
    @IsNumber()
    feel_modifier: number

    @IsString()
    feel_measure: string

    @IsNumber()
    feelNameIdId: number
}