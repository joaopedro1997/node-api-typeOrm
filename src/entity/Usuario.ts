import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()//chave primaria auto-gerada
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

}
