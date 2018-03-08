import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { trigger, style, transition, animate, keyframes, query, stagger, group, state, animateChild } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DhlServiceService } from '../../dhl-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm,
} from '@angular/forms';

import { DashService } from './dash.service';
import { IAutoTb } from "./AutoTb";
import { IServerResponse } from "./ServerResponse";
// import { IEmpresas } from "./empresas";
// import { ITipoPromocion } from "./tipo-promocion";
// import { IMarca } from "./marca";
// import { ISucursal } from "./sucursal";
import { stringify } from 'querystring';
import { IPromise } from 'protractor/node_modules/@types/q';
import { IComentarioById } from "./comentarioByid";
import { ICotizacionById } from "./cotizacionByid";
// import { Iimage } from "./Img";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import swal from "sweetalert2";


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  // //ruta
  // public serverPath: any = "http://192.168.20.92:3420/promociones/";

  //Variables para el formulario de guardar una nueva promocion
  form: FormGroup;
  txt_idUnidad = new FormControl("", Validators.required);

  //Variables para el formualario de actualizar imagen
  formUpdate: FormGroup;

  //Variables a utilizar en la clase
  errorMessage: any;
  idUnidad: number = 0;
  vin: number = 0;
  UnidadID: number = 0;
  Usuario: any;
  comentar : string ="";
  partida : string ="";
  ofertar : number = 0;
  precio : string ="";
  cantidad : string ="";

  unidades: Array<any>;
  comentarios: Array<any>;
  cotizaciones: Array<any>;
  evidencias: Array<any>;
  oferta: any;
  modalReference: any;

  public temp_var: Object = false;
  temp_comentario = false;
  temp_cotizacion = false;


  constructor(private _Dashservice: DashService,
    private modalService: NgbModal,
    public fb: FormBuilder,
    private dhlService: DhlServiceService,
    private domSanitizer: DomSanitizer,
    private _http: HttpClient) {
      this.Usuario = JSON.parse(localStorage.getItem("user"));
      this.form = fb.group({
        "txt_idUnidad": this.txt_idUnidad,
      });

      this.formUpdate = fb.group({
      });
  
      this.unidades = [];
      this.comentarios = [];
      this.cotizaciones = [];
      this.evidencias = [];
  }

  resultadoDash: IAutoTb[] = [];
  resultadoComentariosById: IComentarioById[] = [];
  resultadoCotizacionesById: ICotizacionById[] = [];

  ngOnInit() {
    this.getTablaDash();
  }

  getTablaDash(): void {
    this.dhlService.GetUnidades().subscribe((res: Array<any>) => {
      this.unidades = res;
      this.temp_var = true;
    });
  }

  addOferta(oferta){
    oferta.estatus = null;
    swal({
      title: '¿Desea guardar la oferta?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {

        this.dhlService.AddOferta(oferta).subscribe((res: any) => {
          if (res && res.length > 0 && res[0].UnidadId > 0) {
            this.oferta = {};
            this.modalReference.close();
            oferta.unidad.monto = res[0].Monto;
            oferta.unidad.estatusOferta = res[0].Estatus;

            swal(
              'Guardado',
              'Oferta Guardada con Exito.',
              'success'
            );
          } else {
            this.oferta = {};
          }
        });

      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelado',
          'No se Ingreso la oferta.',
          'error'
        )
      }
    });
  }

  approveOferta(oferta){
    oferta.estatus = "Aceptada";
    swal({
      title: '¿Desea aprobar la oferta?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aprobar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {

        this.dhlService.AddOferta(oferta).subscribe((res: any) => {
          if (res && res.length > 0 && res[0].UnidadId > 0) {
            this.oferta = {};
            this.modalReference.close();
            oferta.unidad.monto = res[0].Monto;
            oferta.unidad.estatusOferta = res[0].Estatus;
            
            swal(
              'Aprobada',
              'Oferta Aprobada con Exito.',
              'success'
            );
          } else {
            this.oferta = {};
          }
        });

      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelado',
          'No se aprobó la oferta.',
          'error'
        )
      }
    });
  }

  denyOferta(oferta){
    oferta.estatus = "Rechazada";
    swal({
      title: '¿Desea rechazar la oferta?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Rechazar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {

        this.dhlService.AddOferta(oferta).subscribe((res: any) => {
          if (res && res.length > 0 && res[0].UnidadId > 0) {
            this.oferta = {};
            oferta.unidad.monto = res[0].Monto;
            oferta.unidad.estatusOferta = res[0].Estatus;
            this.modalReference.close();
            swal(
              'Rechazada',
              'Oferta Rechazada con Exito.',
              'success'
            );
          } else {
            this.oferta = {};
          }
        });

      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelado',
          'No se Rechazó la oferta.',
          'error'
        )
      }
    });
  }

  insertComentario(idUnidad, comentario) {
    swal({
      title: '¿Desea Ingresar el Comentario?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.dhlService.InsertComentario(idUnidad, comentario, this.Usuario.idusuario).subscribe((res: any) => {
          if (res && res.ok > 0) {
            //Llena Tabla Comentario 
            this.dhlService.GetComentariosByUnidad(idUnidad).subscribe((res: Array<any>) => {
              this.comentarios = res;
            });
            this.comentar = "";
            
            swal(
              'Guardado',
              'Comentario Guardado con Exito.',
              'success'
            );
          } else {
            this.comentar = "";
          }
        });

      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelado',
          'No se Ingreso Comentario.',
          'error'
        )
      }
    });
  }

  insertCotizacion(idUnidad, partida,cantidad,precio) {
    swal({
      title: '¿Desea Ingresar la Partida?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {

        this.dhlService.InsertCotizacion(idUnidad, partida,cantidad,precio, this.Usuario.idusuario).subscribe((res: any) => {
          if (res && res.ok > 0) {
            
            //Llena Tabla Partidas 
            this.dhlService.GetCotizacionByUnidad(idUnidad).subscribe((res: Array<any>) => {
              
              this.cotizaciones = res;
            });
            this.partida = "";
            this.precio = "";
            this.cantidad = "";
            
            swal(
              'Guardado',
              'Partida Guardada con Exito.',
              'success'
            );
          } else {
            this.partida = "";
            this.precio = "";
            this.cantidad = "";
          }
        });

      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelado',
          'No se Ingreso La Partida.',
          'error'
        )
      }
    });
  }

  //================================================================= M O D A L E S =================================================//

  //========= MODAL INSERT ========//
  open(content, idUnidad, vin) {
    this.modalService.open(content, { size: "lg" });

    this.dhlService.GetComentariosByUnidad(idUnidad).subscribe((res: Array<any>) => {
      
      this.comentarios = res;
      this.temp_comentario = true;
      this.UnidadID = idUnidad;
    });
  }


  openEvidencias(evidencia, idUnidad) {
    this.modalService.open(evidencia, { size: 'lg' });

    this.dhlService.GetEvidenciasByUnidad(idUnidad).subscribe((res: Array<any>) => {
      this.evidencias = res;
    });
  }

  openOfertas(content, unidad) {
    this.modalReference = this.modalService.open(content, { size: 'lg' });
    this.oferta = {
      idUnidad: unidad.id,
      idUsuario: this.Usuario.idusuario,
      monto: unidad.monto,
      estatus: unidad.estatusOferta,
      isNew: unidad.monto == null || unidad.monto == 0,
      unidad: unidad
    };
  }

  openCot(cotizacion, idUnidad) {
    this.modalService.open(cotizacion, { size: 'lg' });

    this.dhlService.GetCotizacionByUnidad(idUnidad).subscribe((res: Array<any>) => {
      this.cotizaciones = res;
      this.UnidadID = idUnidad;
    });
  }
}
