import {IsNumber, IsOptional, IsString} from "class-validator";

export class CreateTranslationDto {
    @IsOptional()
    @IsNumber()
    id: number

    @IsOptional()
    @IsString()
    en: string

    @IsOptional()
    @IsString()
    ua: string
}