import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreatureAttributeMeasureDto {
  @IsOptional()
  id: number

  @IsNumber()
  attributeId: number;

  @IsNumber()
  @IsOptional()
  amt: number | null;

  @IsBoolean()
  @IsOptional()
  msr: boolean | null;
}
