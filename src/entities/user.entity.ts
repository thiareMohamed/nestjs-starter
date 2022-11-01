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

export class SerializedUser {
    id: number;
    email: string;
    prenom: string;
    nom: string;
    telephone: string;
    
    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.prenom = user.prenom;
        this.nom = user.nom;
        this.telephone = user.telephone;
    }
}
