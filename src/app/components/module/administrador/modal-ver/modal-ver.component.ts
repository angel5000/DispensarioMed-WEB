
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
  selector: 'app-modal-ver',
  standalone: true,
  imports: [ReactiveFormsModule,ReactiveFormsModule,
    MatDialogModule,MatFormFieldModule,MatInputModule,
    MatButtonModule],
  templateUrl: './modal-ver.component.html',
  styleUrl: './modal-ver.component.css'
})
export class ModalVerComponent {
  verForm: FormGroup ;
  
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<ModalVerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    this.verForm = this.fb.group({
      idPaciente: [data.idPaciente],
      cedula: [data.cedula],
      nombres: [data.nombres],
      apellidos: [data.apellidos],
      fechaNacimiento: [data.fechaNacimiento],
      provincia: [data.provincia],
      canton: [data.canton],
      direccion: [data.direccion],
      numCelular: [data.numCelular],
      genero: [data.genero],
      correoElectronico: [data.correoElectronico],
   
    
    });
}
ngOnInit(): void {
  // Aquí puedes deshabilitar el input
  this.verForm.get('idPaciente')?.disable();
this.verForm.get('cedula')?.disable();
this.verForm.get('nombres')?.disable();
this.verForm.get('apellidos')?.disable();
this.verForm.get('fechaNacimiento')?.disable();
this.verForm.get('provincia')?.disable();
this.verForm.get('canton')?.disable();
this.verForm.get('direccion')?.disable();
this.verForm.get('numCelular')?.disable();
this.verForm.get('genero')?.disable();
this.verForm.get('correoElectronico')?.disable();
}
onCancel(): void {
  this.dialogRef.close();
}


}
