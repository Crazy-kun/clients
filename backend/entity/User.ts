import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { City } from './City'
import { Street } from './Street'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string

    @Column()
    username!: string

    @Column()
    email!: string

    @Column()
    phone!: string

    @ManyToOne(type => City, city => city.users)
    city!: City

    @ManyToOne(type => Street, street => street.users)
    street!: Street
}
