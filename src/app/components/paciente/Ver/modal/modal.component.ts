
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


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule,ReactiveFormsModule,
    MatDialogModule,MatFormFieldModule,MatInputModule,
    MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  verForm: FormGroup ;
  
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    this.verForm = this.fb.group({
      idHistorial: [data.idHistorial],
      nombrePaciente: [data.nombrePaciente],
      nombreMedico: [data.nombreMedico],
      diagnostico: [data.diagnostico],
      fechaHoraVisita: [data. fechaHoraVisita],
      sintomas: [data.sintomas],
      tratamiento: [data.tratamiento],
      receta: [data.receta],
   
    
    });
}
ngOnInit(): void {
  // Aquí puedes deshabilitar el input
  this.verForm.get('idHistorial')?.disable();
 
  this.verForm.get('nombrePaciente')?.disable();
  this.verForm.get('nombreMedico')?.disable();
  this.verForm.get('diagnostico')?.disable();
  this.verForm.get('fechaHoraVisita')?.disable();
  this.verForm.get('sintomas')?.disable();
  this.verForm.get('tratamiento')?.disable();
  this.verForm.get('receta')?.disable();
}
onCancel(): void {
  this.dialogRef.close();
}
}
