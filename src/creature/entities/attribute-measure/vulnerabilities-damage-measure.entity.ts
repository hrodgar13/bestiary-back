import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Speed } from '../attributes/speed.entity';
import { Damage } from '../attributes/damage.entity';
import { MultiFieldsENUM } from '../../dtos/income/attribute-measure/mutli-select.dto';
import { Creature } from '../creature.entity';

@Entity()
export class VulnerabilitiesDamageMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Damage, (damage) => damage.vulnerabilities)
  attribute: Damage;

  @ManyToOne(
    () => Creature,
    (creature) => creature[MultiFieldsENUM.vulnerabilities],
  )
  creature: Creature;
}
