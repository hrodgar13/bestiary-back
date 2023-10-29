import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Speed } from '../attributes/speed.entity';
import {SavingThrow} from "../attributes/saving-throw.entity";

@Entity()
export class SavingThrowMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amt: number;

  @OneToOne(() => SavingThrow)
  ['saving-throw-type']: SavingThrow;
}
