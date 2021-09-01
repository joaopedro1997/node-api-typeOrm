import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Lancamento {

  constructor(valor: number, descricao: string, data: Date, usuario: Usuario) {
    this.valor = valor;
    this.descricao = descricao;
    this.data = data;
    this.usuario = usuario;
  }

  @PrimaryGeneratedColumn()//chave primaria auto-gerada
  id: number;

  @Column({ type: 'float' })
  valor: number;

  @Column()
  descricao: string;

  @Column()
  data: Date;

  @ManyToOne(() => Usuario)
  usuario: Usuario;


}
