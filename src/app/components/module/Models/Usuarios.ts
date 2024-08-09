export interface Usuarios{
    idusuario: number;
    idmedUsuario: number;
    idDatosUsuario: number;
    usuario: string,
    rol: number;
    activa: string;
    salt: any;
    hashedContrasena:any;
}
export interface Usuariosdt{

    usuario: string,

    estado: string;

}