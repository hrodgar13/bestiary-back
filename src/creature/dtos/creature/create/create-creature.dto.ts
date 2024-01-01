import {IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString} from "class-validator";
import {CreateTranslationDto} from "./create-translation.dto";
import {CreateStatBlockDto} from "./create-stat-block.dto";
import {CreateMeasureDto} from "./create-measure.dto";
import {CreateActionAbilityDto} from "./create-action-ability.dto";

export class CreateCreatureDto {
  @IsOptional()
  @IsNumber()
  id?: number

  @IsBoolean()
  isFinished: boolean

  @IsObject()
  name: CreateTranslationDto

  @IsOptional()
  armor_class: number | null

  @IsOptional()
  @IsString()
  image: string

  @IsOptional()
  @IsString()
  hits: string | null

  @IsOptional()
  @IsString()
  hits_in_dice: string | null

  @IsOptional()
  danger_lvl: number | null

  @IsOptional()
  @IsString()
  experience: string | null

  @IsOptional()
  mastery_bonus: number | null

  @IsObject()
  stat_block: CreateStatBlockDto

  @IsArray()
  measures: CreateMeasureDto[]

  @IsArray()
  attributes: number[]

  @IsArray()
  action_abilities: CreateActionAbilityDto[]

  @IsObject()
  description: CreateTranslationDto
}
