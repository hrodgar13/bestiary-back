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
  attrName: Translation;

  @OneToMany(
    () => ConditionsMeasure,
    (condition) => condition.attribute,
  )
  conditionsMeasures: ConditionsMeasure[];
}
