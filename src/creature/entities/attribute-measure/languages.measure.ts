import {
  Column,
  Entity, ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Speed } from '../attributes/speed.entity';
import {Damage} from "../attributes/damage.entity";
import {Language} from "../attributes/language.entity";
import {MultiFieldsENUM} from "../../dtos/income/attribute-measure/mutli-select.dto";
import {Skill} from "../attributes/skill.entity";
import {Creature} from "../creature.entity";

@Entity()
export class LanguagesMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  amt: number;

  @ManyToOne(() => Language, (lang) => lang.languagesMeasures)
  [MultiFieldsENUM.languages]: Language;

  @ManyToOne(() => Creature, (creature) => creature[MultiFieldsENUM.languages])
  creature: Creature;
}
