import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Translation } from '../translations/translation.entity';
import {Creature} from "../creature.entity";

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Translation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  type: Translation;

  @OneToMany(() => Creature, (creatures) => creatures.type)
  creatures: Creature[];
}
