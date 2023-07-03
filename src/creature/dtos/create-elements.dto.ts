import {IsNumber, IsString, Max, Min} from "class-validator";

export class CreateAlignmentDto {
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

export class CreateDamageTypeDto {
    @IsString()
    damage_name: string
}

export class CreateLanguageDto {
    @IsString()
    language_name: string
}

export class CreateSavingThrowDto {
    @IsString()
    saving_throw_name: string
}

export class CreateSizeDto {
    @IsString()
    size: string
}

export class CreateSkillDto {
    @IsString()
    skill_name: string
}

export class CreateSpeedTypeDto {
    @IsString()
    speed_type_name: string;
}

export class CreateStatementDto {
    @IsString()
    statement: string
}

export class CreateTypeDto {
    @IsString()
    type: string
}