import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CitasMedicas } from '../../../interfaces/citas-medicas';
import { HistorialMedico } from '../../../interfaces/historial-medico';
import { HistorialMedicoService } from '../../../services/historial-medico.service';

@Component({
  selector: 'app-historial-form',
  standalone: true,
  imports: [
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './historial-form.component.html',
  styleUrl: './historial-form.component.css'
})
export class HistorialFormComponent {

  form: FormGroup

  constructor(
    private dialogRef: MatDialogRef<HistorialFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CitasMedicas,
    private _historialServices: HistorialMedicoService,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      sintomas: ['', Validators.required],
      diagnostico: ['', Validators.required],
      receta: ['', Validators.required],
      tratamiento: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    const historial: HistorialMedico = {
      idPaciente: this.data.idPaciente,
      idMedico: this.data.idMedico,
      fechaVisita: new Date().getDate(),
      sintomas: this.form.value.sintomas,
      diagnostico: this.form.value.diagnostico,
      tratamiento: this.form.value.tratamiento,
      receta: this.form.value.receta,
    }

    
    /*     this._historialServices.post(historial).subscribe({
      complete: () => this.dialogRef.close()
    }) */
    
    this.dialogRef.close()
  }

  get sintomas() { return this.form.get('sintomas')! }
  get diagnostico() { return this.form.get('diagnostico')! }
  get receta() { return this.form.get('receta')! }
  get tratamiento() { return this.form.get('tratamiento')! }

}
