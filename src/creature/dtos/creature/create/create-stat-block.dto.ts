import {IsNumber, IsOptional} from "class-validator";

export class CreateStatBlockDto {
  @IsOptional()
  @IsNumber()
  id? : number

  @IsOptional()
  @IsNumber()
  strength: number | null

  @IsOptional()
  @IsNumber()
  dexterity: number | null

  @IsOptional()
  @IsNumber()
  constitution: number | null

  @IsOptional()
  @IsNumber()
  intelligence: number | null

  @IsOptional()
  @IsNumber()
  wisdom: number | null

  @IsOptional()
  @IsNumber()
  charisma: number | null
}
