import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Translation } from '../translations/translation.entity';
import { MultiFieldsENUM } from '../../dtos/income/attribute-measure/mutli-select.dto';
import { ConditionsMeasure } from '../attribute-measure/conditions-measure.entity';

@Entity()
export class Condition {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Translation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  condition: Translation;

  @OneToMany(
    () => ConditionsMeasure,
    (condition) => condition[MultiFieldsENUM.conditionsImmunities],
  )
  conditionsMeasures: ConditionsMeasure[];
}
