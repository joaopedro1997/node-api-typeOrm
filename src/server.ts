import { app } from './app';

const PORT = 3000;

const server =
    app.listen(PORT, () => console.log(`App ouvindo na porta ${PORT}`));

/**
 * Ao encerrar o processo, o app é finalizado também
 */

process.on('SIGINT', () => {
    server.close();
    console.log('App finalizado')
})