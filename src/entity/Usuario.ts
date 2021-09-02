import { Entity, PrimaryGeneratedColumn, Column, OneToMany, IsNull } from "typeorm";
import { Lancamento } from "./Lancamento";

@Entity()
export class Usuario {

    constructor(nome: string, email: string) {
        this.nome = nome;
        this.email = email;
    }

    @PrimaryGeneratedColumn()//chave primaria auto-gerada
    id: number;

    @Column()
    nome: string;

    @Column("varchar", { length: 50 })
    email: string;

    @Column(
        {
            type: "tinyint",
            nullable: true,
            default: "1"
        })
    status: string;

    @OneToMany(type => Lancamento, lancamento => lancamento.usuario)
    // @OneToMany(() => Lancamento, lancamento => lancamento.usuario)
    lancamentos: Lancamento[];

}
