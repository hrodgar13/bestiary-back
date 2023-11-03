import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Speed } from '../attributes/speed.entity';
import { Skill } from '../attributes/skill.entity';
import { MultiFieldsENUM } from '../../dtos/income/attribute-measure/mutli-select.dto';
import { SavingThrow } from '../attributes/saving-throw.entity';
import { Creature } from '../creature.entity';

@Entity()
export class SkillsMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amt: number;

  @ManyToOne(() => Skill, (skill) => skill.skillsMeasures)
  attribute: Skill;

  @ManyToOne(() => Creature, (creature) => creature[MultiFieldsENUM.skills])
  creature: Creature;
}
