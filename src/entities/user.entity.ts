import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
     
    @Column('varchar', { unique: true })
    email: string;
     
    @Column('varchar')
    password: string;
     
    @Column('varchar')
    prenom: string;

    @Column('varchar')
    nom: string;

    @Column('varchar')
    telephone: string;
}
