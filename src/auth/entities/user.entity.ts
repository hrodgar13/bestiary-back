import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @Column()
    email: string;

    @Column()
    password: string;
}