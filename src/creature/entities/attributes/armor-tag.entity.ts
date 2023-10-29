import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Translation } from '../translations/translation.entity';
import {Creature} from "../creature.entity";

@Entity()
export class ArmorTag {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Translation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  ['armor-tag']: Translation;

  @OneToMany(() => Creature, (creatures) => creatures.armorTag)
  creatures: Creature[];
}
