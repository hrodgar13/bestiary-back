import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Speed } from '../attributes/speed.entity';
import {Damage} from "../attributes/damage.entity";
import {Language} from "../attributes/language.entity";

@Entity()
export class LanguagesMeasureEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  amt: string;

  @OneToOne(() => Language)
  ['language-type']: Language;
}
