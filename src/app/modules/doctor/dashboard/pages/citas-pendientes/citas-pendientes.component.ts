import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

//Componentes
import { HistorialFormComponent } from '../../components/historial-form/historial-form.component';
import { DetalleCitaComponent } from '../../components/detalle-cita/detalle-cita.component';

//Interface
import { CitasMedicas } from './../../../interfaces/citas-medicas';

//Service
import { CitasMedicasService } from '../../../services/citas-medicas.service';

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

@Component({
  selector: 'app-citas-pendientes',
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
  templateUrl: './citas-pendientes.component.html',
  styleUrl: './citas-pendientes.component.css'
})
export default class CitasPendientesComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['idCita', 'nombres', 'fechaHora', 'motivoCita', 'disponibilidad', 'fechaFin', 'accion'];
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

  openHistorial(cita: CitasMedicas) {
    this.dialog.open(HistorialFormComponent, {
      autoFocus: false,
      width: '380px',
      data: cita
    })
  }

}
