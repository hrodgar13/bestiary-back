import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Speed } from '../attributes/speed.entity';
import {Skill} from "../attributes/skill.entity";

@Entity()
export class SkillsMeasureEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amt: number;

  @OneToOne(() => Skill)
  ['skill-type']: Skill;
}
