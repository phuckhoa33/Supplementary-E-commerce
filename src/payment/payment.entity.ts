import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    total: string

    @Column()
    orderId: string

    @Column()
    userId: number

    @Column()
    telephone: string

    @Column()
    cardType: string

    @CreateDateColumn()
    createdAt: Date 

    @CreateDateColumn()
    modifiedAt: Date
}