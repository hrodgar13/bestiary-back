import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  en: string;

  @Column({ nullable: true })
  ua: string;
}
