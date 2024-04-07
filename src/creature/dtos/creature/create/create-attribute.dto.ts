import {IsOptional, IsString} from "class-validator";
import {CreateTranslationDto} from "./create-translation.dto";

export class CreateAttributeDto {
    @IsString()
    attr_cat: string
    scaling_from: string | null
    name: CreateTranslationDto
}
