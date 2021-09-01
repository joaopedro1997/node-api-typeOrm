import { Router } from "express";
import { LancamentoController } from "../controller/LancamentoController";
import { Usuario } from "../entity/Usuario";
import { expressYupMiddleware } from 'express-yup-middleware';
import * as Yup from 'yup';
import { UsuarioController } from "../controller/UsuarioController";
import { Lancamento } from "../entity/Lancamento";

export const routerLancamento = Router();
const lancamentoCTRL = new LancamentoController();
const usuarioCTRL = new UsuarioController();

/**
 * validando entradas
 */

const salvarLancamento = {
  schema: {
    body: {
      yupSchema: Yup.object().shape({
        valor: Yup.number().required('O valor é obrigatório'),
        descricao: Yup.string().required('A descricao é obrigatório').min(3).max(50),
        idUsuario: Yup.number().required('O id do usuário é obrigatório'),
        data: Yup.date().required('A data é obrigatório'),
      }),
    }
  },
}

/**
 * Serviço para salvar um novo lancamento
 */

routerLancamento.post('/', expressYupMiddleware({ schemaValidator: salvarLancamento }), async (req, res) => {
  const { idUsuario, valor, descricao, data } = req.body;

  const usuario = await usuarioCTRL.recuperarPorId(idUsuario);

  if (usuario) {
    const lancamento = new Lancamento(valor, descricao, data, usuario);
    const lancametoSalvo = await lancamentoCTRL.salvar(lancamento);
    res.json(lancametoSalvo);
  } else {
    res.status(404).json({ message: 'Usuário do lancamento não encontrado' });
  }

});


