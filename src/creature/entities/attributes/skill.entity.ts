import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Translation } from '../translations/translation.entity';
import {SavingThrowMeasure} from "../attribute-measure/saving-throw-measure.entity";
import {MultiFieldsENUM} from "../../dtos/income/attribute-measure/mutli-select.dto";
import {SkillsMeasure} from "../attribute-measure/skills.measure";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Translation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  skill: Translation;

  @OneToMany(() => SkillsMeasure, (skill) => skill[MultiFieldsENUM.skills])
  skillsMeasures: SkillsMeasure[];
}
