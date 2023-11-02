import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Translation } from '../translations/translation.entity';
import {Creature} from "../creature.entity";

@Entity()
export class Alignment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Translation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  attrName: Translation;

  @OneToMany(() => Creature, (creatures) => creatures.alignment)
  creatures: Creature[];
}
