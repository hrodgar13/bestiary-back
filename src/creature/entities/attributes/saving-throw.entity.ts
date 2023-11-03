import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Translation } from '../translations/translation.entity';
import { SpeedsMeasure } from '../attribute-measure/speeds-measure.entity';
import { MultiFieldsENUM } from '../../dtos/income/attribute-measure/mutli-select.dto';
import { SavingThrowMeasure } from '../attribute-measure/saving-throw-measure.entity';

@Entity()
export class SavingThrow {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Translation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  attrName: Translation;

  @OneToMany(() => SavingThrowMeasure, (st) => st.attribute)
  stMeasure: SavingThrowMeasure[];
}
