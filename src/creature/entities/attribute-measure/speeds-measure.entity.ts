import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Speed } from '../attributes/speed.entity';
import { MultiFieldsENUM } from '../../dtos/income/attribute-measure/mutli-select.dto';
import { Damage } from '../attributes/damage.entity';
import { Creature } from '../creature.entity';

@Entity()
export class SpeedsMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amt: number;

  @ManyToOne(() => Speed, (speed) => speed.speedsMeasures)
  attribute: Speed;

  @ManyToOne(() => Creature, (creature) => creature[MultiFieldsENUM.speeds])
  creature: Creature;
}
