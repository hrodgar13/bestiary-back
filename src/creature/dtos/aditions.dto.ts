import { IsString } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  size: string;
}

export class CreateTypeDto {
  @IsString()
  type: string;
}

export class CreateAlignmentDto {
  @IsString()
  alignment: string;
}

export class CreateArmorDto {
  @IsString()
  armorType: string;
}

export class CreateSpeedTypeDto {
  @IsString()
  speed_type_name: string;
}

export class CreateSavingThrowDto {
  @IsString()
  saving_throw_name: string;
}

export class CreateSkillDto {
  @IsString()
  skill_name: string;
}

export class CreateDamageTypeDto {
  @IsString()
  damage_name: string;
}

export class CreateStatementDto {
  @IsString()
  statement: string;
}

export class CreateFeelNameDto {
  @IsString()
  feel_name: string;
}

export class CreateLanguageDto {
  @IsString()
  language_name: string;
}
