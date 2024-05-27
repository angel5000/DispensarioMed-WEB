export interface CitasMedicas {
    idPaciente:     number
    idMedico:       number
    idHorarioCitas: number
    nombres:        string
    apellidos:      string
    cedula?:        string
    direccion?:     string
    idCita:         number
    fechaHora:      Date
    disponibilidad: string
    motivoCita:     string
    costo?:         number
    fechaFin:       string
}
