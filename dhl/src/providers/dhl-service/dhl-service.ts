import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DhlServiceProvider {

  server: any;
  constructor(public http: HttpClient) {

    this.server = this.http.get('manifest.json').subscribe(
      (data: any) => { // Success
        this.server = data.server;
      },
      (error) => {
      }
    );
  }

  Login(usuario, password) {
    let url = this.server + 'Logea?Usuario=' + usuario + '&Password=' + password;
    console.log(url)
    return this.http.get(url);
  }

  getUnidad(vin) {
    let url = this.server + 'BuscarVin?Vin=' + vin;
    console.log(url)
    return this.http.get(url);
  }

  getInstrucciones(tipoDocumento) {
    let url = this.server + 'instrucciones?tipoDocumento=' + tipoDocumento;
    console.log(url)
    return this.http.get(url);
  }

  finaliza(documentos){
    let url = this.server + 'Guarda';
    console.log(url);
    return this.http.post(url, documentos);
  }

  buscaDocumentos(vin){
    let url = this.server + 'BuscarDoctos?Vin=' + vin;
    console.log(url)
    return this.http.get(url);
  }
}
