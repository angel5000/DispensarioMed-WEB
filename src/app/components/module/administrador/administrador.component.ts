import { Component, OnInit } from '@angular/core';
import { UsuariosServicio } from '../Servicios/UsuariosServices'; 
import { Usuarios } from '../Models/Usuarios';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalVerComponent } from './modal-ver/modal-ver.component';
import { PacienteServicio } from '../../Servicios/PacienteServicio';
import { Paciente } from '../../Model/Paciente';
import { ModalActualizarComponent } from './modal-actualizar/modal-actualizar.component';
@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  selectedTipo: string = 'paciente';
  usuarios: Usuarios[] = [];
  displayedColumns: string[] = ['id', 'usuario', 'contrasena', 'activo', 'acciones'];

  constructor(private usuariosServicio: UsuariosServicio,public dialog: MatDialog,
    private Pacienteservis:PacienteServicio) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  onTipoUsuarioChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTipo = selectElement.value;
    this.cargarUsuarios();
  }

getidusuarios(id:number){

  this.usuariosServicio.getPacientesPorId(id).subscribe({
    next: (data: any) => {
      // Verifica si los datos están encapsulados dentro de $values
      if (data.$values) {
        this.usuarios = data.$values[0];
      } else {
       // this.libros = data;
      }
   
    }
});

}
Ver(id:number) {
  this.Pacienteservis.getPacienteById(id).subscribe({
    next: (data: any) => {
      // Extrae los datos del paciente desde $values
      if (data.$values && data.$values.length > 0) {
        const paciente = data.$values[0];
        
        // Abre el modal y pasa los datos del paciente
        const dialogRef = this.dialog.open(ModalVerComponent, {
          width: '600px',
          height: '455px',
          data: paciente // Pasar los datos del paciente directamente al modal
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log("Patient data: ", result);
          }
        });
      } else {
        console.log("No se encontraron datos para el paciente con ID:", id);
      }
    },
    error: (response: any) => {
      console.log("Error fetching patient data: ", response.error);
    },
    complete: () => {
      console.info('Patient data retrieval complete');
    }
  });
}

editar(id:number) {
  this.usuariosServicio.getUsuarios(id).subscribe({
    next: (data: any) => {
      // La respuesta es un objeto directo, no un contenedor con $values
      if (data) {
        console.log("Patient data: ", data);
        // Abre el modal y pasa los datos del paciente
        const dialogRef = this.dialog.open(ModalActualizarComponent, {
          width: '600px',
          height: '455px',
          data: data // Pasar los datos del paciente directamente al modal
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.cargarUsuarios();
          }
        });
      } else {
        console.log("No se encontraron datos para el paciente con ID:", id);
      }
    },
    error: (response: any) => {
      console.log("Error fetching patient data: ", response.error);
    },
    complete: () => {
      console.info('Patient data retrieval complete');
    }
  });
}









EliminarUsuarios(id:number){
  this.usuariosServicio.eliminarPacientes(id).subscribe(
    () => {
      console.log('Médico eliminado exitosamente');
      this.cargarUsuarios(); // Recargar la lista después de eliminar
    },
    error => {
      console.error('Error al eliminar el médico', error);
    }
  );

}

  cargarUsuarios(): void {
    if (this.selectedTipo === 'paciente') {
      this.usuariosServicio.getPacientes().subscribe({
        next: (data: any) => {
          // Verifica si los datos están encapsulados dentro de $values
          if (data.$values) {
            this.usuarios = data.$values;
          } else {
           // this.libros = data;
          }
       
        }
    });


    } else if (this.selectedTipo === 'medico') {
      this.usuariosServicio.getMedicos().subscribe({
        next: (data: any) => {
          // Verifica si los datos están encapsulados dentro de $values
          if (data.$values) {
            this.usuarios = data.$values;
          } else {
           // this.libros = data;
          }
       
        }
    });
    }}
}
