export interface CitasMedicas{
    $id: number,
    idPaciente:number,
    idHorariosCitas:number;
    fechaHora: string,
    fechaFin: string,
    nombreDoctor: string,
    disponibilidad: string,
    direccion: string,
    habitacion: string,
    especialidad: string,
    sector:string
  
}