import { createQueryBuilder, getManager } from "typeorm";
import { Usuario } from "../entity/Usuario";

export class UsuarioController {

  async salvar(usuario: Usuario) {
    const usuarioSalvo = await getManager().save(usuario);
    return usuarioSalvo;
  }

  async recuperarTodos() {

    const usuario = await createQueryBuilder(Usuario, "u")
      .leftJoinAndSelect("u.lancamentos", "lancamento")
      .getOne();

    return usuario;
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
  }

}