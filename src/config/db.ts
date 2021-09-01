import { createConnection } from 'typeorm';

export const conectarServidorNoBD = async () => {
  const conexao = await createConnection();
  console.log(`App conecatado ao BD ${conexao.options.database}`);

  process.on('SIGINT', () => {
    conexao.close().then(() => console.log('conexao com o db fechada'))
  });
};