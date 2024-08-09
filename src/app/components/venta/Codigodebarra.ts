import * as bwipjs from 'bwip-js';

async function generateBarcode(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bwipjs.toBuffer({
        bcid: 'code128', // Barcode type
        text: data, // Text to encode
        scale: 3, // 3x scaling factor
        height: 10, // Bar height, in millimeters
        includetext: true, // Show human-readable text
      }, (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          const base64 = buffer.toString('base64');
          const dataUrl = `data:image/png;base64,${base64}`;
          resolve(dataUrl);
        }
      });
    });
  }
