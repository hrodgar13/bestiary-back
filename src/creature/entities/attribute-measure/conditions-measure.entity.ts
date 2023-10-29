import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Speed } from '../attributes/speed.entity';
import {Condition} from "../attributes/condition.entity";

@Entity()
export class ConditionsMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Condition)
  ['condition-type']: Condition;
}
