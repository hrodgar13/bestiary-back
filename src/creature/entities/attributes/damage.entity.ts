import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Translation } from '../translations/translation.entity';
import { ImmunitiesDamageMeasure } from '../attribute-measure/immunities-damage-measure.entity';
import { MultiFieldsENUM } from '../../dtos/income/attribute-measure/mutli-select.dto';
import { VulnerabilitiesDamageMeasure } from '../attribute-measure/vulnerabilities-damage-measure.entity';
import { ResistsDamageMeasure } from '../attribute-measure/resists-damage-measure.entity';

@Entity()
export class Damage {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Translation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  attrName: Translation;

  @OneToMany(
    () => ImmunitiesDamageMeasure,
    (idm) => idm[MultiFieldsENUM.immunities],
  )
  immunities: ImmunitiesDamageMeasure[];

  @OneToMany(
    () => VulnerabilitiesDamageMeasure,
    (vdm) => vdm[MultiFieldsENUM.vulnerabilities],
  )
  vulnerabilities: VulnerabilitiesDamageMeasure[];

  @OneToMany(() => ResistsDamageMeasure, (vdm) => vdm[MultiFieldsENUM.resists])
  resists: ResistsDamageMeasure[];
}
