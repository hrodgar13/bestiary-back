import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Translation } from '../translations/translation.entity';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Translation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  region: Translation;
}
