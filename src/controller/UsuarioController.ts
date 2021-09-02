import { createQueryBuilder, getManager, Not } from "typeorm";
import { Usuario } from "../entity/Usuario";

export class UsuarioController {

  async salvar(usuario: Usuario) {

    const usuarioSalvo = await getManager().save(usuario);

    return usuarioSalvo;

    /**
     * consulta com queryBuilder do typeOrm
     */

    // const usuarioSalvo = await createQueryBuilder()
    //   .insert()
    //   .into(Usuario)
    //   .values(usuario)
    //   .execute();

    // return usuarioSalvo;

  }

  async recuperarTodos() {

    /**
     * consulta com queryBuilder do typeOrm
     */

    const usuarios = await createQueryBuilder(Usuario, "u")
      .leftJoinAndSelect("u.lancamentos", "lancamento")
      .where({ id: Not("0") })
      .getMany();


    // const usuario = await getManager()
    //   .find(Usuario, {
    //     relations: ['lancamentos'],
    //     where: { status: Not("0") }
    //   });

    return usuarios;
  }

  async recuperarPorId(id: number) {
    const usuario = await
      getManager()
        .findOne(Usuario, id)

    return usuario;
  }

  async recuperarLancamentoDoUsuario(id: number) {
    const lancamentos = await getManager().findOne(Usuario, id, {
      relations: ['lancamentos']
    });

    return lancamentos;
  }

  async deletarUsuario(id: number) {

    /**
     * consulta com queryBuilder do typeOrm
     */

    // const usuario = await getManager()
    //   .createQueryBuilder()
    //   .update(Usuario)
    //   .set({ status: "0" }).where("id = :id", { id: id })
    //   .execute()

    const usuario = await getManager()
      .update(Usuario, { id: id }, { status: "0" });

    return usuario;
  }

}