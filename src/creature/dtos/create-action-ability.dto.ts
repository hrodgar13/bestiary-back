import {IsNumber, IsObject, IsOptional, IsString} from "class-validator";
import {CreateTranslationDto} from "./create-translation.dto";

export class CreateActionAbilityDto {
    @IsOptional()
    @IsNumber()
    id?: number

    @IsString()
    actionType: string

    @IsObject()
    title: CreateTranslationDto

    @IsObject()
    description: CreateTranslationDto
}