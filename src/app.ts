import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';

import { conectarServidorNoBD } from './config/db';
import { routerUsuario } from './routes/usuario'
import { routerLancamento } from './routes/lancamento';

/**
 * Cria a aplicação
 */

export const app = express();

/**
 * Libera o acesso aos serviços
 */

app.use(cors());

/**
 * Configura os logs
 */

app.use(logger('dev'));

/**
 * Permite receber e enviar JSON
 */

app.use(express.json());

/**
 * Conecta o BD
 */

conectarServidorNoBD();

/**
 * Configuração de rotas
 */

app.use('/usuario', routerUsuario);
app.use('/lancamento', routerLancamento);
app.use('/', (req, res) => res.send('api teste '));
