import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Feeling } from '../attributes/feeling.entity';

@Entity()
export class FeelingsMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amt: number;

  @Column({ nullable: true })
  isMeasureEnable: boolean;

  @OneToOne(() => Feeling)
  ['feeling-type']: Feeling;
}
