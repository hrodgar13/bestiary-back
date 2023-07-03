import {IsNumber, IsString} from "class-validator";

export class CreateImagesDto {
    @IsString()
    name: string

    @IsNumber()
    creature_id: number
}