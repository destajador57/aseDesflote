import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App, ToastController, Platform, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CapturaPage } from '../captura/captura';
import { InstruccionesPage } from '../instrucciones/instrucciones';
import { Documento, Tipo } from '../../shared/documento';
import { HomePage } from '../home/home';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DhlServiceProvider } from '../../providers/dhl-service/dhl-service';


@IonicPage()
@Component({
  selector: 'page-control',
  templateUrl: 'control.html',
})
export class ControlPage {

  doc: Documento;
  terminado: boolean;
  vin: string;
  cargado: boolean;
  showedAlert: boolean;
  confirmAlert: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public plt: Platform,
    private app: App,
    private localNotifications: LocalNotifications,
    private dhlService: DhlServiceProvider,
    private alertCtrl: AlertController
  ) {
    this.vin = this.navParams.get('vin');
    console.log(this.vin);
    this.doc = {
      placaDelantera: '',
      placaTrasera: '',
      interior: '',
      tablero: '',
      motor: '',
      tarjeta: '',
      verificacion: '',
      gases: '',
      escape: '',
      transmision: ''
    }

    this.dhlService.buscaDocumentos(this.vin).subscribe((res: any) => {
      this.cargado = res.ok > 0;
    });
    this.terminado = false;

    plt.registerBackButtonAction(() => {
      console.log('-------------------------boton para atras del control-----------------');
      let pagina = this.navCtrl.getActive();
      console.log('nombre de la pagina');
      console.log(pagina.name);
      console.log(pagina.id);

      let captura = this.app._appRoot._modalPortal.getActive();
      console.log('captura');
      console.log(captura);
      if (captura) {
        console.log('va a disminuir la captura');
        captura.dismiss();
      } else if (this.navCtrl.canGoBack()) {
        console.log('puede regresar a la pagina anterior');
        this.navCtrl.pop();
      } else if (pagina.name == 'HomePage') {
        console.log('estas en home entonces sales');
        this.plt.exitApp();
      } else {
        console.log('valida los datos del objeto');
        this.regresar();
      }

    });
  }

  regresar() {
    console.log('dentro de regresar');
    this.confirmAlert = this.alertCtrl.create({
      title: "Salir",
      message: "¿Los archivos cargados seran eliminados?",
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            return;
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    console.log('antes del if');
    console.log(this.doc);

    if (this.doc.placaDelantera == ''
      && this.doc.placaTrasera == ''
      && this.doc.interior == ''
      && this.doc.tablero == ''
      && this.doc.motor == ''
      && this.doc.tarjeta == ''
      && this.doc.verificacion == ''
      && this.doc.gases == ''
      && this.doc.escape == ''
      && this.doc.transmision == '') {
      console.log('todo vacio, manda a home');
      this.navCtrl.setRoot(HomePage);
    } else {
      console.log('tiene algun documento, muestra alert');
      this.confirmAlert.present();
    }
  }

  confirmExitApp() {
    this.showedAlert = true;
    this.confirmAlert = this.alertCtrl.create({
      title: "Salir",
      message: "¿Esta seguro que desea salir de la aplicación?",
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.showedAlert = false;
            return;
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.plt.exitApp();
          }
        }
      ]
    });
    this.confirmAlert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlPage');
  }

  cargar(tipoDocumento: Tipo) {
    console.log('antes de mostar la confirmacion');
    let archivoCargado = false;
    switch (tipoDocumento) {
      case 1:
        archivoCargado = this.doc.placaDelantera.length > 0;
        break;
      case 2:
        archivoCargado = this.doc.placaTrasera.length > 0;
        break;
      case 3:
        archivoCargado = this.doc.interior.length > 0;
        break;
      case 4:
        archivoCargado = this.doc.tablero.length > 0;
        break;
      case 5:
        archivoCargado = this.doc.motor.length > 0;
        break;
      case 6:
        archivoCargado = this.doc.tarjeta.length > 0;
        break;
      case 7:
        archivoCargado = this.doc.verificacion.length > 0;
        break;
      case 8:
        archivoCargado = this.doc.gases.length > 0;
        break;
      case 9:
        archivoCargado = this.doc.escape.length > 0;
        break;
      default:
        archivoCargado = this.doc.transmision.length > 0;
        break;
    }

    if (archivoCargado) {
      this.alertaCargado(tipoDocumento);
    } else {
      this.captura(tipoDocumento);
    }
  }

  alertaCargado(tipoDocumento: Tipo) {
    this.confirmAlert = this.alertCtrl.create({
      title: "Alerta",
      message: "La evidencia esta cargada, ¿deseas sobre escribirla?",
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            return;
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.captura(tipoDocumento);
          }
        }
      ]
    });
    this.confirmAlert.present();
  }

  captura(tipoDocumento: Tipo) {
    console.log(tipoDocumento);
    console.log('va a invocar el modal');
    let modal = this.modalCtrl.create(CapturaPage, { tipo: tipoDocumento, vin: this.vin });
    modal.onDidDismiss(data => {
      console.log('page > modal dismissed > data > ', data);
      if (data) {
        console.log('Dentro del modal');
        console.log(data);

        switch (tipoDocumento) {
          case 1:
            this.doc.placaDelantera = data.idDocumento;
            break;
          case 2:
            this.doc.placaTrasera = data.idDocumento;
            break;
          case 3:
            this.doc.interior = data.idDocumento;
            break;
          case 4:
            this.doc.tablero = data.idDocumento;
            break;
          case 5:
            this.doc.motor = data.idDocumento;
            break;
          case 6:
            this.doc.tarjeta = data.idDocumento;
            break;
          case 7:
            this.doc.verificacion = data.idDocumento;
            break;
          case 8:
            this.doc.gases = data.idDocumento;
            break;
          case 9:
            this.doc.escape = data.idDocumento;
            break;
          default:
            this.doc.transmision = data.idDocumento;
            break;
        }
        this.valido();
      }
    });
    modal.present();
  }

  valido() {
    console.log('entro');
    if (this.doc.placaDelantera && this.doc.placaDelantera.length > 0
      && this.doc.placaTrasera && this.doc.placaTrasera.length > 0
      && this.doc.interior && this.doc.interior.length > 0
      && this.doc.tablero && this.doc.tablero.length > 0
      && this.doc.motor && this.doc.motor.length > 0
      && this.doc.tarjeta && this.doc.tarjeta.length > 0
      && this.doc.verificacion && this.doc.verificacion.length > 0
      //&& this.doc.gases && this.doc.gases.length > 0
      && this.doc.escape && this.doc.escape.length > 0
      && this.doc.transmision && this.doc.transmision.length > 0) {

      this.terminado = true;
    }
  }

  finalizar() {
    console.log('finalizar');

    let doctos = [];
    if (this.doc.placaDelantera && this.doc.placaDelantera.length > 0) {
      doctos.push({
        DoctoId: 1,
        ArchivoId: this.doc.placaDelantera
      });
    }
    if (this.doc.placaTrasera && this.doc.placaTrasera.length > 0) {
      doctos.push({
        DoctoId: 2,
        ArchivoId: this.doc.placaTrasera
      });
    }
    if (this.doc.interior && this.doc.interior.length > 0) {
      doctos.push({
        DoctoId: 3,
        ArchivoId: this.doc.interior
      });
    }
    if (this.doc.tablero && this.doc.tablero.length > 0) {
      doctos.push({
        DoctoId: 4,
        ArchivoId: this.doc.tablero
      });
    }
    if (this.doc.motor && this.doc.motor.length > 0) {
      doctos.push({
        DoctoId: 5,
        ArchivoId: this.doc.motor
      });
    }
    if (this.doc.tarjeta && this.doc.tarjeta.length > 0) {
      doctos.push({
        DoctoId: 6,
        ArchivoId: this.doc.tarjeta
      });
    }
    if (this.doc.tarjeta && this.doc.tarjeta.length > 0) {
      doctos.push({
        DoctoId: 6,
        ArchivoId: this.doc.tarjeta
      });
    }
    if (this.doc.verificacion && this.doc.verificacion.length > 0) {
      doctos.push({
        DoctoId: 7,
        ArchivoId: this.doc.verificacion
      });
    }
    if (this.doc.gases && this.doc.gases.length > 0) {
      doctos.push({
        DoctoId: 8,
        ArchivoId: this.doc.gases
      });
    }
    if (this.doc.escape && this.doc.escape.length > 0) {
      doctos.push({
        DoctoId: 9,
        ArchivoId: this.doc.escape
      });
    }
    if (this.doc.transmision && this.doc.transmision.length > 0) {
      doctos.push({
        DoctoId: 10,
        ArchivoId: this.doc.transmision
      });
    }

    let documentos = { Vin: this.vin, Doctos: doctos };

    this.dhlService.finaliza(documentos).subscribe((res: any) => {
      if (res.UnidadId > 0) {
        this.presentToast('Las evidencias se guardaron correctamente.');
        this.localNotifications.schedule({
          id: 1,
          title: 'Evidencias guardadas.',
          text: 'Las evidencias se guardaron con exito, unidad con matricula ' + res.placas,
          sound: this.plt.is('android') ? 'file://sound.mp3' : 'file://beep.caf',
          data: { id: 1 }
        });
        this.navCtrl.setRoot(HomePage);
      } else {
        this.presentToast('Ocurrio un error, intenta mas tarde.');
      }
    });
  }

  instrucciones() {
    this.navCtrl.push(InstruccionesPage);
  }

  salir() {
    this.navCtrl.setRoot(LoginPage);
  }



  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
