import { Router } from "express";
import { UsuarioController } from "../controller/UsuarioController";
import { Usuario } from "../entity/Usuario";
import { expressYupMiddleware } from 'express-yup-middleware';
import * as Yup from 'yup';
export const routerUsuario = Router();
const usuarioCTRL = new UsuarioController();

/**
 * validando entradas
 */

const schemaValidator = {
  schema: {
    body: {
      yupSchema: Yup.object().shape({
        email: Yup.string().required('O email é obrigatório').email('Insira um email valido'),
        nome: Yup.string().required('O nome é obrigatório').min(3).max(50),
      }),
    }
  },
}

const buscarLancamentoPorId = {
  schema: {
    params: {
      yupSchema: Yup.object().shape({
        idUsuario: Yup.number().required('O id é obrigatório'),
      }),
    }
  },
}

/**
 * Serviço para buscar um lancamento
 */

routerUsuario.get('/lancamentos/:idUsuario', expressYupMiddleware({ schemaValidator: buscarLancamentoPorId }), async (req, res) => {
  const idUsuario = parseInt(req.params.idUsuario);

  const lancamento = await usuarioCTRL.recuperarLancamentoDoUsuario(idUsuario);

  res.json(lancamento);

});


/**
 * Serviço para salvar um novo usuário
 */

routerUsuario.post('/', expressYupMiddleware({ schemaValidator }), async (req, res) => {
  const { nome, email } = req.body;
  const usuario = new Usuario(nome, email);
  const usuarioSalvo = await usuarioCTRL.salvar(usuario);
  res.json(usuarioSalvo);
});

/**
 * Serviço para recuperar todos os usuários
 */

routerUsuario.get('/', async (req, res) => {
  const usuarios = await usuarioCTRL.recuperarTodos();
  res.json(usuarios);
});

