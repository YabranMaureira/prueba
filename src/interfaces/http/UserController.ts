import { Request, Response } from "express";
import { RegisterUser} from "../../application/use-cases/RegisterUser";
import { LoginUser } from "../../application/use-cases/LoginUser";
import { PrismaUserRepository } from "../../infrastructure/database/prisma/PrismaUserRepository";

export class UserController{
    static async login(req: Request, res: Response): Promise<void> {
        const {correo, password} = req.body;

        const userRepository = new PrismaUserRepository();
        const loginUser = new LoginUser(userRepository);

        try {
            const token = await loginUser.execute({
                correo,
                password,
            });
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ message: (error as Error).message});
        }
    }
    static async register(req: Request, res: Response): Promise<void> {
        const {nombre, correo, password, rol, imagen} = req.body;

        const userRepository = new PrismaUserRepository();
        const registeUser = new RegisterUser(userRepository);

        try{
          const user = await registeUser.execute({
              nombre,
              correo,
              password,
              rol,
              imagen,
          });
          res.status(201).json(user);
      } catch(error){
          res.status(400).json({ message: (error as Error).message });
      }
      }
      }