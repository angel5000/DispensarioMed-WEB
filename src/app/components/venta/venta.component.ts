import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CitaEscogida } from '../Model/CitaEscogida';
import { AgendaServicio } from '../Servicios/AgendaServicio';
import { PDFDocument, rgb } from 'pdf-lib';
import * as bwipjs from 'bwip-js';
import JsBarcode from 'jsbarcode';
import { CitasMedica } from '../Model/Citasmedicas';
import { CitasMedicasServicio } from '../Servicios/CitasMedicas';
import { AuthServicio } from '../Servicios/AuthServicio';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css'
})
export class VentaComponent {
  horario: CitaEscogida | undefined;
  constructor( private horarioService: AgendaServicio,
    private citas:CitasMedicasServicio,
    private router: Router,   private route: ActivatedRoute,  private authServicio: AuthServicio) {}
  navigateToAgenda() {
    this.router.navigate(['/agendamiento']);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idHorario = +params['idHorario'];
      this.horarioService.obtenerHorarioPorId(idHorario).subscribe(
        data => this.horario = data,
        error => console.error('Error al obtener los datos:', error)
      );
    });
  }
  crearCitaMedica() {
    const userId = this.authServicio.getUserId();
    const cita: CitasMedica = {
      idpaciente: userId!,
      idmedico: this.horario?.idDoctor,
      idhorarioCitas: this.horario?.idHorario,
      motivo: '71',
    };

    this.citas.ingresarCitaMedica(cita).subscribe(
      response => {
        console.log('Cita médica ingresada con éxito', response);
      },
      error => {
        console.error('Error al ingresar cita médica', error);
      }
    );
  }


  async generatePDF() {
   
    const doc = await PDFDocument.create();
    const page = doc.addPage([600, 400]);
    const { width, height } = page.getSize();
    const barcodeData = this.horario?.idHorario.toString() || '123456';

    // Generate barcode image URL
    const barcodeUrl = await this.generateBarcode(barcodeData);

    // Fetch the barcode image
    const barcodeImageBytes = await fetch(barcodeUrl).then(res => res.arrayBuffer());
    const barcodeImage = await doc.embedPng(barcodeImageBytes);
    // Set up some basic styles
    const titleFontSize = 15;
    const titleFontSize2 = 24;
    const subtitleFontSize = 18;
    const textFontSize = 14;

    page.drawText('Dispensario Medico', {
      x: 50,
      y: height - 25,
      size: titleFontSize2,
      color: rgb(0, 0, 0),
    });
    page.drawText('Detalles de la Cita Medica', {
      x: 50,
      y: height - 55,
      size: titleFontSize,
      color: rgb(0, 0, 0),
    });
  
    if (this.horario) {
      page.drawText('ID CITA: ' + this.horario.idHorario, {
        x: 50,
        y: height - 100,
        size: textFontSize,
        color: rgb(0, 0, 0),
      });

      page.drawText('ID DOCTOR: ' + this.horario.idDoctor, {
        x: 50,
        y: height - 130,
        size: textFontSize,
        color: rgb(0, 0, 0),
      });

      page.drawText('NOMBRE DE DOCTOR: ' + this.horario.nombreDoctor, {
        x: 50,
        y: height - 160,
        size: textFontSize,
        color: rgb(0, 0, 0),
      });

      page.drawText('LUGAR DE DISPENSARIO: ' + this.horario.direccion, {
        x: 50,
        y: height - 190,
        size: textFontSize,
        color: rgb(0, 0, 0),
      });

      page.drawText('HORARIO: ' + this.horario.fechaHora, {
        x: 50,
        y: height - 220,
        size: textFontSize,
        color: rgb(0, 0, 0),
      });

      page.drawText('ESPECIALIDAD: ' + this.horario.especialidad, {
        x: 50,
        y: height - 250,
        size: textFontSize,
        color: rgb(0, 0, 0),
      });

      page.drawText('HABITACION: ' + this.horario.habitacion, {
        x: 50,
        y: height - 280,
        size: textFontSize,
        color: rgb(0, 0, 0),
      });
      page.drawText('Tipo de Pago: ' + 'Transferencia Bancaria', {
        x: 50,
        y: height - 310,
        size: textFontSize,
        color: rgb(0, 0, 0),
      });

      page.drawImage(barcodeImage, {
        x: 50,
        y: height - 375,
        width: 80,
        height: 50,
      });

    } else {
      page.drawText('No hay datos disponibles.', {
        x: 50,
        y: height - 100,
        size: textFontSize,
        color: rgb(1, 0, 0),
      });
    }

    const pdfBytes = await doc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    this.crearCitaMedica();
    this.showAlert();
  }
  showAlert(): void {
    Swal.fire({
      title: 'Agendar Cita',
      text: 'Cita agendada con exito',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/paciente']);
      }
    });
  }
  async generateBarcode(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      
      // Generate barcode and draw it on the canvas
      JsBarcode(canvas, data, {
        format: 'CODE128',
        displayValue: true,
        width: 2,
        height: 100,
      });

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);
    });
  }


}
