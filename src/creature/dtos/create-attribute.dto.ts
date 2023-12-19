import {IsOptional} from "class-validator";
import {CreateTranslationDto} from "./create-translation.dto";

export class CreateAttributeDto {
    attr_cat: string
    name: CreateTranslationDto
}