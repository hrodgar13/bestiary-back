import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Condition } from '../attributes/condition.entity';
import { MultiFieldsENUM } from '../../dtos/income/attribute-measure/mutli-select.dto';
import { Creature } from '../creature.entity';

@Entity()
export class ConditionsMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Condition, (condition) => condition.conditionsMeasures)
  [MultiFieldsENUM.conditionsImmunities]: Condition;

  @ManyToOne(
    () => Creature,
    (creature) => creature[MultiFieldsENUM.conditionsImmunities],
  )
  creature: Creature;
}
