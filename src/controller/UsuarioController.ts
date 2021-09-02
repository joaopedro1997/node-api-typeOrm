import { createQueryBuilder, getManager } from "typeorm";
import { Lancamento } from "../entity/Lancamento";
import { Usuario } from "../entity/Usuario";

export class UsuarioController {

  async salvar(usuario: Usuario) {
    const usuarioSalvo = await getManager().save(usuario);
    return usuarioSalvo;
  }

  async recuperarTodos() {

    const usuario = await createQueryBuilder(Usuario,"user")
    .leftJoinAndSelect(Lancamento,"l", "l.usuarioId",)
    // .where("user.name = :name", { name: "Timber" })
    .execute();

    return usuario;
    // const usuarios = await getManager()
    //     .createQueryBuilder(Usuario, 'u')
    //     .select()
    //     .addSelect("l.*")
    //     .leftJoin(Lancamento, 'l', 'l.usuarioId = u.id') //INNER JOIN table2 t2 ON t1.id = t2.id
    //     .execute() // depend on what you need really
    // return usuarios;
  }

  async recuperarPorId(id: number) {
    const usuario = await getManager().findOne(Usuario, id);
    return usuario;
  }

  async recuperarLancamentoDoUsuario(id: number) {
    const lancamentos = await getManager().findOne(Usuario, id, {
      relations: ['lancamentos']
    });
    return lancamentos;
  }

  async deletarUsuario(id: number) {


    const usuario = await getManager()
      .createQueryBuilder()
      .update(Usuario)
      .set({ status: "0" }).where("id = :id", { id: id })
      .execute()

    return usuario;

    // const usuario = await getManager()
    //   .createQueryBuilder()
    //   .delete()
    //   .from(Usuario).where("id = :id", { id: id })
    //   .execute()

    // return usuario;

  }

}