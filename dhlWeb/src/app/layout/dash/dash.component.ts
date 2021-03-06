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
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
  providers: [CurrencyPipe]

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
  Unidad: any;
  Usuario: any;
  comentar: string = "";
  partida: string = "";
  ofertar: number = 0;
  precio: string = "";
  cantidad: string = "";
  unidades: Array<any>;
  comentarios: Array<any>;
  cotizaciones: Array<any>;
  evidencias: Array<any>;
  oferta: any;
  modalReference: any;
  accionC: string;
  cotizacionC: string;
  trasladoC: string;
  ofertaC: string;

  public temp_var: Object = false;
  temp_comentario = false;
  temp_cotizacion = false;


  constructor(private _Dashservice: DashService,
    private modalService: NgbModal,
    public fb: FormBuilder,
    private dhlService: DhlServiceService,
    private domSanitizer: DomSanitizer,
    private _http: HttpClient,
    private cp: CurrencyPipe) {
    this.Usuario = JSON.parse(localStorage.getItem("user"));
    this.accionC = this.validateColumn('Accion');
    this.cotizacionC = this.validateColumn('Cotizacion');
    this.trasladoC = this.validateColumn('Traslado');
    this.ofertaC = this.validateColumn('Oferta');
    console.log(this.Usuario);
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

  validateColumn(colName: string): string {
    // Posibles returns r=read | w=write | v=validate | d=deny
    var columnsPermissions = this.Usuario.permisos;
    var columnPermission = columnsPermissions.filter(column => column.columna == colName);
    if (columnPermission.length > 0) {
      return columnPermission[0].permiso;
    }

    return "d";
  }

  addOferta(oferta) {
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
            if (this.modalReference) {
              this.modalReference.close();
            }

            this.modalReference = null;
            oferta.unidad.monto = res[0].Monto;
            oferta.unidad.estatusOferta = res[0].Estatus;
            oferta.unidad.NombreStatus = "Ofertada"
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

  approveOferta(unidad) {
    var oferta = {
      idUnidad: unidad.id,
      idUsuario: this.Usuario.idusuario,
      monto: unidad.monto,
      estatus: "Aceptada"
    };
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
            unidad.monto = res[0].Monto;
            unidad.estatusOferta = res[0].Estatus;
            unidad.NombreStatus = "Comprada"
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

  denyOferta(unidad) {
    var oferta = {
      idUnidad: unidad.id,
      idUsuario: this.Usuario.idusuario,
      monto: unidad.monto,
      estatus: "Rechazada"
    };
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
            unidad.monto = res[0].Monto;
            unidad.estatusOferta = res[0].Estatus;
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
          var resp = res && res.resp ? JSON.parse(res.resp) : [];
          if (resp.length > 0 && resp[0].ok > 0) {
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

  insertImporteTraslado(unidad, importe) {
    swal({
      title: unidad.responsable == 'DHL' ? '¿Desea guardar el traslado?' : '¿Desea guardar el monto?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.dhlService.InsertImporte(unidad.id, importe, unidad.responsable, this.Usuario.idusuario).subscribe((res: any) => {
          if (res && res.length > 0 && res[0].ok > 0) {
            if (this.modalReference) {
              this.modalReference.close(true);
            }
            this.modalReference = null;
            unidad.importeTraslado = importe;
            unidad.NombreStatus = 'Entregada BANORTE';
            swal(
              'Guardado',
              'Importe Guardado con Exito.',
              'success'
            );
          } else {
            this.oferta = {};
          }
        });

      } else if (result.dismiss === 'cancel') {
        if (unidad.responsable == 'DHL')
          unidad.responsable = null;
        swal(
          'Cancelado',
          'No se guardó el importe.',
          'error'
        )
      }
    });
  }

  deleteCotizacion(idpartida, idUnidad) {
    swal({
      title: '¿Desea Eliminar la Partida?',
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

        this.dhlService.deleteCotizacion(idpartida, this.Usuario.idusuario).subscribe((res: any) => {
          console.log(res);
          if (res && res.OK > 0) {
            //this.cotizaciones=[];
            //Llena Tabla Partidas
            this.dhlService.GetCotizacionByUnidad(idUnidad).subscribe((res: Array<any>) => {

              this.cotizaciones = res;
            });
            this.partida = "";
            this.precio = "";
            this.cantidad = "";

            swal(
              'Guardado',
              'Partida Eliminada con Exito.',
              'success'
            );
          } else {

            console.log('error en el login');
            this.partida = "";
            this.precio = "";
            this.cantidad = "";
          }
        });

      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelado',
          'No se Elimino La Partida.',
          'error'
        )
      }
    });

  }

  insertCotizacion(idUnidad, partida, cantidad, precio) {
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

        this.dhlService.InsertCotizacion(idUnidad, partida, cantidad, precio, this.Usuario.idusuario).subscribe((res: any) => {
          if (res && res.length > 0 && res[0].UnidadId > 0) {
            this.cotizaciones = [];

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

  openImporte(content, unidad) {
    this.modalReference = this.modalService.open(content, { size: "lg" });
    this.modalReference.result.then((result) => {
      if (result != true) {
        unidad.responsable = null;
        unidad.importeTraslado = null;
      }
    });
    this.Unidad = unidad;
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

  calculateTotal(): number {
    let total = 0;
    this.cotizaciones.forEach((cotizacion, idx) => {
      total += cotizacion.precio;
    });
    return total;
  }

  retornaLey(): string {
    let aprobE = 0;
    let leyenda = '';
    this.cotizaciones.forEach((cotizacion, idx) => {
      aprobE = cotizacion.aprobada;
    });

    if (aprobE == 0) {
      leyenda = 'Cotización Pendiente de Aprobar o Anular';
    }

    if (aprobE == 1) {
      leyenda = 'Cotización Aprobada';
    }
    if (aprobE == 2) {
      leyenda = 'Cotización Anulada';
    }

    return leyenda;
  }

  retornaLeyCot(cotizacionC): string {
    let aprobE = 0;
    let leyenda = 'Editar Cotización';

    if (cotizacionC != 'w') {
      leyenda = 'Ver Cotización';
    }

    return leyenda;
  }

  AprobCoti(idUnidad, idAprob) {
    let pregunta = '';
    let respuesta = '';
    if (idAprob == 1) {
      pregunta = '¿Esta Seguro de Aprobar la Cotización?'
      respuesta = 'Cotización Aprobada con Éxito.';
    }
    else {
      pregunta = '¿Esta Seguro de Anular la Cotización?'
      respuesta = 'Cotización Anulada con Éxito.';
    }

    swal({

      title: pregunta,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.dhlService.aprobarCotizacion(idUnidad, idAprob, this.Usuario.idusuario).subscribe((res: any) => {
          if (res && res.length > 0 && res[0].OK > 0) {

            this.dhlService.GetUnidades().subscribe((res: Array<any>) => {
              this.unidades = res;
              this.temp_var = true;
            });

            swal(
              'Guardado',
              respuesta,
              'success'
            );

          } else {
            this.comentar = "";
          }
        });

      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelado',
          'Proceso Cancelado',
          'error'
        )
      }
    });

  }

  displayTraslado(importe) {
    return importe != null && importe > 0 ? `(${this.cp.transform(importe)})` : ''
  }
}
