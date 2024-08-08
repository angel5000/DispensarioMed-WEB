
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
@Component({
  selector: 'app-modal-editar',
  standalone: true,
  imports: [ReactiveFormsModule,ReactiveFormsModule,
    MatDialogModule,MatFormFieldModule,MatInputModule,
    MatButtonModule,CommonModule,MatOptionModule, MatSelectModule],
  templateUrl: './modal-editar.component.html',
  styleUrl: './modal-editar.component.css'
})
export class ModalEditarComponent {
  verForm: FormGroup ;
  horarios: AgendaDatos[]=[];
  citass: CitasMedicas[]=[];
  horarioactual:number;
  horarioanterior:number;
constructor(private citasMedicasService: CitasMedicasServicio,
  private authServicio: AuthServicio,private fb: FormBuilder,public dialogRef: MatDialogRef<ModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any){
    this.horarios = data.horarios || [];
    this.verForm = this.fb.group({
      idcita: [data.idHorario],
      nombreMedico: [data.nombreDoctor],
      FechasReprogramables: [data.fechaHora],
   
    
    });
    this.horarioanterior=0;
    this.horarioactual=0;
  }
  ngOnInit(): void {
    // Aquí puedes deshabilitar el input
    this.verForm.get('idcita')?.disable();
    this.verForm.get('nombreMedico')?.disable();
 
   
  }
  onFechaHoraChange(selectedFechaHora: string): void {
    const selectedHorario = this.horarios.find(horario => horario.fechaHora === selectedFechaHora);
    if (selectedHorario) {
      this.verForm.patchValue({ idcita: selectedHorario.idHorario});
      this.horarioactual=selectedHorario.idHorario;
    }
    console.log(this.horarioactual, this.horarioanterior);
  }

  
  reprograma(): void {
    const userId = this.authServicio.getUserId();
   const repro : Reprogramar={
      idPaciente: userId!,
      idHorario:this.horarioactual,
       }
       console.log(repro);
    this.citasMedicasService.updateCitaMedica(repro).subscribe({
      next: (response) => {
        console.log('Cita reprogramada exitosamente:', response);
        // Maneja la respuesta, muestra un mensaje, etc.
      },
      error: (error) => {
        console.error('Error al reprogramar la cita:', error);
        // Maneja el error, muestra un mensaje, etc.
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  
  
}