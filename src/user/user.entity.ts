import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    username: string

    @Column({ unique: true })
    email: string

    @Column({ length: 50 })
    password: string

    @CreateDateColumn()
    createdAt: Date 

    @CreateDateColumn()
    modifiedAt: Date
}