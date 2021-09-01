import "reflect-metadata";
import { createConnection } from "typeorm";
import { Usuario } from "./entity/Usuario";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const usuario = new Usuario();
    usuario.nome = "Timber";
    usuario.email = "Saw";
    await connection.manager.save(usuario);
    console.log("Saved a new user with id: " + usuario.id);

    console.log("Loading users from the database...");
    const usuarios = await connection.manager.find(Usuario);
    console.log("Loaded users: ", usuarios);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
