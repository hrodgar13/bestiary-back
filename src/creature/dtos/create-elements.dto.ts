import {IsNumber, IsString, Max, Min} from "class-validator";

export class CreateElementsDto {
    @IsString()
    aligment: string
}

export class CreateArmorClassDto {
    @IsString()
    armorType: string
}

export class CreateStatBlockDto {
    @IsNumber()
    @Min(0)
    @Max(30)
    strength: number

    @IsNumber()
    @Min(0)
    @Max(30)
    dexterity: number

    @IsNumber()
    @Min(0)
    @Max(30)
    construction: number

    @IsNumber()
    @Min(0)
    @Max(30)
    intelligence: number

    @IsNumber()
    @Min(0)
    @Max(30)
    wisdom: number

    @IsNumber()
    @Min(0)
    @Max(30)
    charisma: number
}

export class CreateFeelDto {
    @IsString()
    feel_name: string
}

export class CreateDamageType {
    @IsString()
    damage_name: string
}