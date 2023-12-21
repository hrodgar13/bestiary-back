import {IsNumber, IsOptional, IsString} from "class-validator";

export class CreateMeasureDto {

    @IsOptional()
    @IsNumber()
    id?: number

    @IsString()
    measure_cat: string

    @IsOptional()
    @IsNumber()
    amt: number | null

    @IsNumber()
    @IsOptional()
    isMeasureEnable: boolean | null

    @IsNumber()
    attribute: number
}