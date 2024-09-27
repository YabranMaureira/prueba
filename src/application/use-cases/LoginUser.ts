import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { sign } from "jsonwebtoken";
import { User } from "../../domain/entities/User";

interface LoginUserRequest{
    correo: string;
    password: string;
}

export class LoginUser{
    
    constructor(private userRepository:IUserRepository){}

    async execute(request: LoginUserRequest): Promise<string>{

        const user = await this.userRepository.findByEmail(request.correo);
        
        if(!user){
            throw new Error('Correo o contraseña incorrectos');
        }
        if (user.password !== request.password){
            throw new ErrorEvent('Correo o contraseña incorrectos');
        }
        const token = sign(
            
            {userId:user.id,rol:user.rol},
            'your_secret_key',
            {expiresIn: '1h'

            }
        );
        return token;
    }
}