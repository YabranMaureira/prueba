import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

interface RegisterUserRequest {
  nombre: string;
  correo: string;
  password: string;
  rol: 'Administrador' | 'Profesor';
  imagen?: string;
}

export class RegisterUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(request: RegisterUserRequest): Promise<User> {
    // Validación del rol
    if (request.rol !== "Profesor" && request.rol !== "Administrador") {
      throw new Error("El rol debe ser 'Profesor' o 'Administrador'");
    }

    // Verificar si el correo ya está registrado
    const existingUser = await this.userRepository.findByEmail(request.correo);
    if (existingUser) {
      throw new Error('El correo ya está registrado');
    }

    // Crear el nuevo usuario
    const user = new User(
      0,  // El ID será generado automáticamente
      request.nombre,
      request.correo,
      request.password,
      request.rol,
      request.imagen
    );

    // Guardar el usuario en el repositorio
    return await this.userRepository.create(user);
  }
}
