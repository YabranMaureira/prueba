import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaUserRepository implements IUserRepository {
    async create (user: User): Promise<User> {
        const createdUser = await prisma.user.create({
            data:{
                nombre: user.nombre,
                correo: user.correo,
                password: user.password,
                rol: user.rol,
                imagen: user.imagen,
            },
        });

        return new User(
            createdUser.id,
            createdUser.nombre,
            createdUser.correo,
            createdUser.password,
            createdUser.rol,
            createdUser.imagen || undefined
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { correo: email},
        });

        if (!user) return null;

        return new User(user.id, user.nombre, user.correo, user.password, user.rol, user.imagen || undefined);

    }
}