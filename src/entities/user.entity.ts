import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
     
    @Column('varchar', { unique: true, nullable: false })
    email: string;
     
    @Column('varchar', { nullable: false })
    password: string;
}

export class SerializedUser {
    id: number;
    email: string;
    
    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
    }
}
