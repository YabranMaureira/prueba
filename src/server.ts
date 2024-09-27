import express from "express";
import { UserController } from "./interfaces/http/UserController";
import routes from "./interfaces/http/routes";

const app = express();

app.use(express.json());

app.use(routes);

app.post('/register', UserController.register);


const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log('Servidor esta corriendo en el puerto 3000')
});