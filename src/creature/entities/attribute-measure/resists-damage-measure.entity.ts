import {
  Column,
  Entity, ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Speed } from '../attributes/speed.entity';
import {Damage} from "../attributes/damage.entity";
import {MultiFieldsENUM} from "../../dtos/income/attribute-measure/mutli-select.dto";
import {Creature} from "../creature.entity";

@Entity()
export class ResistsDamageMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Damage, (damage) => damage.resists)
  attribute: Damage;

  @ManyToOne(
      () => Creature,
      (creature) => creature[MultiFieldsENUM.resists],
  )
  creature: Creature;
}
