import {IsOptional, IsString} from "class-validator";

export class CreateTranslationDto {
    @IsOptional()
    @IsString()
    en: string

    @IsOptional()
    @IsString()
    ua: string
}