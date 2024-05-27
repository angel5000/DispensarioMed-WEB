import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CitasMedicas } from '../../../interfaces/citas-medicas';

@Component({
  selector: 'app-detalle-cita',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './detalle-cita.component.html',
  styleUrl: './detalle-cita.component.css'
})
export class DetalleCitaComponent {

  constructor(
    private dialogRef: MatDialogRef<DetalleCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CitasMedicas,
  ) { }

  
}
