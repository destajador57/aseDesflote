import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DhlServiceService {
  urlService: string;

  constructor(private http: HttpClient) {
    // this.urlService = 'http://192.168.0.167:4850/';
    this.urlService = 'http://189.204.141.193:4850/';
    //this.urlService = 'http://192.168.20.71:4850/';
  }

  login(user) {
    const url = this.urlService + 'LogInWeb?Usuario=' + user.usuario + '&Password=' + user.contrasena;
    return this.http.get(url);
  }

  GetUnidades() {
    const url = this.urlService + 'Get_All';
    return this.http.get(url);
  }

  GetComentariosByUnidad(idUnidad) {
    const url = this.urlService + 'BuscaComen?idUnidad=' + idUnidad;
    return this.http.get(url);
  }

  InsertComentario(idUnidad, comentario, UsuarioID) {
    const url = this.urlService + `InsertaCom?UnidadID=${idUnidad}&UsuarioId=${UsuarioID}&Comentario=${comentario}`;
    return this.http.get(url);
  }

  AddOferta(oferta) {
    const url = this.urlService + `GuardaOferta?idUsuario=${oferta.idUsuario}&idUnidad=${oferta.idUnidad}&monto=${oferta.monto}&estatus=${oferta.estatus}`;
    return this.http.get(url);
  }

  InsertImporte(idUnidad, importe, responsable, UsuarioID) {
    const url = this.urlService + `InsertaTras?UnidadId=${idUnidad}&UsuarioId=${UsuarioID}&Importe=${importe}&Responsable=${responsable}`;
    return this.http.get(url);
  }

  GetCotizacionByUnidad(idUnidad) {
    const url = this.urlService + 'BuscarCoti?idUnidad=' + idUnidad;
    return this.http.get(url);
  }

  InsertCotizacion(idUnidad, partida, cantidad, precio, UsuarioID) {
    const url = this.urlService + 'InsertCoti?idUnidad=' + idUnidad + '&Partida=' + partida + '&Precio=' + precio + '&Cantidad=' + cantidad + '&UsuarioId=' + UsuarioID;
    return this.http.get(url);
  }

  deleteCotizacion(idpartida, UsuarioID) {
    const url = this.urlService + 'deleteCoti?idPartida=' + idpartida;
    return this.http.get(url);
  }

  GetEvidenciasByUnidad(idUnidad) {
    const url = this.urlService + 'Get_Evidencia?idUnidad=' + idUnidad;
    return this.http.get(url);
  }

  aprobarCotizacion(idUnidad, idAprob, UsuarioID) {
    const url = this.urlService + 'AprobCoti?IdUnidad=' + idUnidad + '&IdAprob=' + idAprob + '&UsuarioId=' + UsuarioID;
    //console.log(url);
    return this.http.get(url);
  }
}
