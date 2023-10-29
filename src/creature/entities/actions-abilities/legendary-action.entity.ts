import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Translation } from '../translations/translation.entity';
import { Creature } from '../creature.entity';
import { ActionsAbilitiesENUM } from '../../dtos/income/actions/action-ability-block.dto';

@Entity()
export class LegendaryAction {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Translation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  title: Translation;

  @OneToOne(() => Translation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  description: Translation;

  @ManyToOne(
    () => Creature,
    (creature) => creature[ActionsAbilitiesENUM.legendaryActions],
  )
  creature: Creature;
}