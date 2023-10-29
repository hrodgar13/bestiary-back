import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MultiFieldsENUM } from '../../dtos/income/attribute-measure/mutli-select.dto';
import { Creature } from '../creature.entity';
import { Region } from '../attributes/region.entity';

@Entity()
export class RegionsMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Region, (regions) => regions.regionsMeasure)
  [MultiFieldsENUM.regions]: Region;

  @ManyToOne(() => Creature, (creature) => creature[MultiFieldsENUM.regions])
  creature: Creature;
}
