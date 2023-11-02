import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Translation } from '../translations/translation.entity';
import {SkillsMeasure} from "../attribute-measure/skills.measure";
import {MultiFieldsENUM} from "../../dtos/income/attribute-measure/mutli-select.dto";
import {LanguagesMeasure} from "../attribute-measure/languages.measure";

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Translation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  attrName: Translation;

  @OneToMany(() => LanguagesMeasure, (lang) => lang[MultiFieldsENUM.languages])
  languagesMeasures: LanguagesMeasure[];
}
