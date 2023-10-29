import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Speed } from '../attributes/speed.entity';

@Entity()
export class SpeedsMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amt: number;

  @OneToOne(() => Speed)
  ['speed-type']: Speed;
}
