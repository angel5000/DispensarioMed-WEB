import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

//Material
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CitasMedicas } from '../../../interfaces/citas-medicas';
import { CitasMedicasService } from '../../../services/citas-medicas.service';
import { DetalleCitaComponent } from '../../components/detalle-cita/detalle-cita.component';

@Component({
  selector: 'app-historial-medico',
  standalone: true,
  imports: [
    DatePipe,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  templateUrl: './historial-medico.component.html',
  styleUrl: './historial-medico.component.css'
})
export default class HistorialMedicoComponent {

  displayedColumns: string[] = ['idCita', 'idPaciente', 'nombres', 'cedula', 'fechaHora', 'motivoCita', 'costo', 'disponibilidad', 'fechaFin', 'accion'];
  dataSource = new MatTableDataSource<CitasMedicas>();
  loading: boolean = false;


  constructor(
    private _citasServices: CitasMedicasService,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getCitas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = "Items por Página ";
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getCitas() {
    this._citasServices.get().subscribe({
      next: (data: CitasMedicas[]) => this.dataSource.data = data
    })
  }

  openDetalle(cita: CitasMedicas) {
    this.dialog.open(DetalleCitaComponent, {
      autoFocus: false,
      width: '450px',
      data: cita
    })
  }


}
