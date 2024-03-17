// app.component.ts
import { Component } from '@angular/core';
import { FileServices } from './shared/services/file.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private fileService: FileServices) {}

  public base64String: string | undefined;
  public fileName: string | undefined;

  public onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.readFileAsBase64(file);
    }
  }

  public readFileAsBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      this.base64String = (reader.result as string).split(',')[1];
      this.fileName = file.name;

      console.log('Base64 String:', this.base64String);
      console.log('File Name:', this.fileName);
    };

    reader.readAsDataURL(file);
  }

  public uploadSelectedFile(): void {
    if (this.base64String && this.fileName) {

      const file = {
        fileBase64: this.base64String,
        fileName: this.fileName,
      }

      this.fileService.uploadFile(file).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
        }
      );
    } else {
      console.error('No se ha seleccionado un archivo.');
    }
  }
}
