import { getManager } from "typeorm";
import { Lancamento } from "../entity/Lancamento";
import { Usuario } from "../entity/Usuario";

export class UsuarioController {

  async salvar(usuario: Usuario) {
    const usuarioSalvo = await getManager().save(usuario);
    return usuarioSalvo;
  }

  async recuperarTodos() {
    const usuarios = await getManager()
      .createQueryBuilder()
      .select()
      .from(Usuario, "usuario")
      .where("status != 0")
      .innerJoinAndSelect("usuario.id", "lancamentos")
      .execute();

    return usuarios;
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