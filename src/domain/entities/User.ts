export class User{

    constructor(
        public id: number,
        public nombre: string,
        public correo: string,
        public password: string,
        public rol: 'Administrador' | 'Profesor',
        public imagen?: string

    ){}
}