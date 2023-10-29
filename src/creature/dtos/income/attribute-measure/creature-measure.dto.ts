import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreatureAttributeMeasureDto {
  @IsNumber()
  attributeId: number;

  @IsNumber()
  @IsOptional()
  amt: number | null;

  @IsBoolean()
  @IsOptional()
  msr: boolean | null;
}
