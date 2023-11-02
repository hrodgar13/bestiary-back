import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Translation } from '../translations/translation.entity';
import { MultiFieldsENUM } from '../../dtos/income/attribute-measure/mutli-select.dto';
import { RegionsMeasure } from '../attribute-measure/regions-measure.entity';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Translation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  attrName: Translation;

  @OneToMany(() => RegionsMeasure, (rm) => rm[MultiFieldsENUM.regions])
  regionsMeasure: RegionsMeasure[];
}
