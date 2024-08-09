
import { Component, EventEmitter, Input, Output ,Inject} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; 
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Console } from 'console';
import { ModalComponent } from '../../../paciente/Ver/modal/modal.component';
import { CitasMedicas } from '../../../Model/Citasmedicas';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select'; // Añadir esto
import { MatOptionModule } from '@angular/material/core';
import { AgendaDatos } from '../../../Model/AgendaDatos';
import { CitasMedicasService } from '../../../../modules/doctor/services/citas-medicas.service';
import { CitasMedicasServicio } from '../../../Servicios/CitasMedicas';
import { AuthServicio } from '../../../Servicios/AuthServicio';
import { Reprogramar } from '../../../Model/Reprogramar';
import { UsuariosServicio } from '../../Servicios/UsuariosServices';
import { Usuarios, Usuariosdt } from '../../Models/Usuarios';
@Component({
  selector: 'app-modal-actualizar',
  standalone: true,
  imports: [ReactiveFormsModule,ReactiveFormsModule,
    MatDialogModule,MatFormFieldModule,MatInputModule,
    MatButtonModule,CommonModule,MatOptionModule, MatSelectModule],
  templateUrl: './modal-actualizar.component.html',
  styleUrl: './modal-actualizar.component.css'
})
export class ModalActualizarComponent {
  editForm!: FormGroup ;
  constructor(private citasMedicasService: CitasMedicasServicio,
   private usuariosServicio: UsuariosServicio, private authServicio: AuthServicio,private fb: FormBuilder,public dialogRef: MatDialogRef<ModalActualizarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
     
      this.editForm = this.fb.group({
       idusuario: data.idusuario,
        nombreUsuario: data.usuario,
        Estados: data.estado,
      
      });
    
    }
    onClose(): void {
      const  idusuario= this.editForm.get('idusuario')?.value!;
const edit :Usuariosdt={
usuario: this.editForm.get('nombreUsuario')?.value,
estado:this.editForm.get('Estados')?.value
}
console.log(edit);
      this.usuariosServicio.actualizarUsuarioPaciente(idusuario, edit)
      .subscribe({
        next: () => {
          console.log('Usuario actualizado exitosamente');
          // Recargar la lista o mostrar un mensaje de éxito
        },
        error: error => {
          console.error('Error al actualizar el usuario', error);
          // Mostrar un mensaje de error
        }
      });

      this.dialogRef.close();
    }
    

}
