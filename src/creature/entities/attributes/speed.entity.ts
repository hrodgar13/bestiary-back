import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Translation} from '../translations/translation.entity';
import {Creature} from "../creature.entity";
import {SpeedsMeasure} from "../attribute-measure/speeds-measure.entity";
import {MultiFieldsENUM} from "../../dtos/income/attribute-measure/mutli-select.dto";

@Entity()
export class Speed {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Translation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  speed: Translation;

  @OneToMany(() => SpeedsMeasure, (sm) => sm[MultiFieldsENUM.speeds])
  speedsMeasures: SpeedsMeasure[];
}
