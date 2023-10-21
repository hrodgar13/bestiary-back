import { IsString } from 'class-validator';

export class ActionsDto {
  @IsString()
  title_EN: string;

  @IsString()
  title_UA: string;

  @IsString()
  action_EN: string;

  @IsString()
  action_UA: string;
}
