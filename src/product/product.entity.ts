import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    title: string

    @ApiProperty()
    @Column()
    description: string

    @Column()
    price: number

    @Column()
    category: string 

    @ApiProperty()
    @Column()
    image: string

    @ApiProperty()
    @Column()
    gallery1: string

    @ApiProperty()
    @Column()
    gallery2: string

    @ApiProperty()
    @Column()
    gallery3: string 

    @ApiProperty()
    @Column()
    gallery4: string
}