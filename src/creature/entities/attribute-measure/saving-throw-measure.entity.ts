import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MultiFieldsENUM } from '../../dtos/income/attribute-measure/mutli-select.dto';
import { Creature } from '../creature.entity';
import { SavingThrow } from '../attributes/saving-throw.entity';

@Entity()
export class SavingThrowMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amt: number;

  @ManyToOne(() => SavingThrow, (st) => st.stMeasure)
  [MultiFieldsENUM.savingThrows]: SavingThrow;

  @ManyToOne(
    () => Creature,
    (creature) => creature[MultiFieldsENUM.savingThrows],
  )
  creature: Creature;
}
