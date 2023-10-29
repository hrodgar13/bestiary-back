import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Feeling } from '../attributes/feeling.entity';
import { MultiFieldsENUM } from '../../dtos/income/attribute-measure/mutli-select.dto';
import { Creature } from '../creature.entity';

@Entity()
export class FeelingsMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amt: number;

  @Column({ nullable: true })
  isMeasureEnable: boolean;

  @ManyToOne(() => Feeling, (feel) => feel.feelingsMeasures)
  [MultiFieldsENUM.feelings]: Feeling;

  @ManyToOne(() => Creature, (creature) => creature[MultiFieldsENUM.feelings])
  creature: Creature;
}
