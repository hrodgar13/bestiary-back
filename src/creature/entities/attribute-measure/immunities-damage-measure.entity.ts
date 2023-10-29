import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Speed } from '../attributes/speed.entity';
import {Damage} from "../attributes/damage.entity";

@Entity()
export class ImmunitiesDamageMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Damage)
  ['damage-type']: Damage;
}
