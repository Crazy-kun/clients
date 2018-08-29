import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { User } from './User'

@Entity()
export class Street {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(type => User, user => user.city)
    users!: User[];
}
