import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Damage } from '../attributes/damage.entity';
import { MultiFieldsENUM } from '../../dtos/income/attribute-measure/mutli-select.dto';
import { Creature } from '../creature.entity';

@Entity()
export class ImmunitiesDamageMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Damage, (damage) => damage.immunities)
  attribute: Damage;

  @ManyToOne(() => Creature, (creature) => creature[MultiFieldsENUM.immunities])
  creature: Creature;
}
