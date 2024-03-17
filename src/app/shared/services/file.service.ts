import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileServices {

  private apiUrl: string = environment.apiBff;
  constructor(private http: HttpClient) {}

  uploadFile(file: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/Blolb/subirFile`, file, {headers});
  }
}
