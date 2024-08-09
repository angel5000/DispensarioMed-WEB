import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent {
  generatePDF() {
    const documentDefinition = {
      content: [
        { text: 'Factura', style: 'header' },
        'Fecha: ' + new Date().toLocaleDateString(),
        { text: 'Detalles de la factura:', style: 'subheader' },
        {
          table: {
            headerRows: 1,
            widths: [ '*', '*', '*' ],
            body: [
              [ 'Descripción', 'Cantidad', 'Precio' ],
              [ 'Producto A', '2', '$20.00' ],
              [ 'Producto B', '1', '$10.00' ],
              [ 'Total', '', '$30.00' ]
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] as [number, number, number, number]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5] as [number, number, number, number]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download('factura.pdf');
  }
}
