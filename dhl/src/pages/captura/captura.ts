import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, LoadingController, ToastController, Platform } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { Tipo } from '../../shared/documento';
import { LoginPage } from '../login/login';
import { InstruccionesPage } from '../instrucciones/instrucciones';
import { DhlServiceProvider } from '../../providers/dhl-service/dhl-service';

@IonicPage()
@Component({
  selector: 'page-captura',
  templateUrl: 'captura.html',
})
export class CapturaPage {

  server: string;
  nombre: string;
  imageURI: string;
  titulo: string;
  vin: string;
  tipo: Tipo;
  instrucciones: { imagen: boolean, valor: any };

  constructor(public viewCtrl: ViewController,
    public navParams: NavParams,
    private transfer: FileTransfer,
    private camera: Camera,
    public plt: Platform,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private DomSanitizer: DomSanitizer,
    private mediaCapture: MediaCapture,

    public http: HttpClient,
    private dhlService: DhlServiceProvider
  ) {

    this.titulo = '';
    this.nombre = null;

    this.tipo = this.navParams.get('tipo');
    this.vin = this.navParams.get('vin');
    console.log('este es el vin');
    console.log(this.vin);


    console.log(this.tipo);

    switch (this.tipo) {
      case 1:
        this.titulo = 'Placa delantera';
        break;
      case 2:
        this.titulo = 'Placa trasera';
        break;
      case 3:
        this.titulo = 'Interior de cabina desde la puerta del conductor';
        break;
      case 4:
        this.titulo = 'Tablero con kilometraje';
        break;
      case 5:
        this.titulo = 'Motor con cofre abierto';
        break;
      case 6:
        this.titulo = 'Tarjeta de circulación';
        break;
      case 7:
        this.titulo = 'Verificación vehicular';
        break;
      case 8:
        this.titulo = 'Verificación de gases';
        break;
      case 9:
        this.titulo = 'Escape con motor encendido';
        break;
      default:
        this.titulo = 'Transmisión en funcionamiento';
        break;
    }

    this.http.get('manifest.json').subscribe(
      (data: any) => { // Success
        this.server = data.server;
        console.log(this.server);
      },
      (error) => {
      }
    );
  }

  ionViewDidLoad() {
    console.log('slack');
    this.dhlService.getInstrucciones(this.tipo).subscribe((res: any) => {
      console.log(res);
      this.instrucciones = res;
    });
  }

  tomar() {

    switch (this.tipo) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        console.log('toma imagen');
        this.tomaImagen();
        break;
      default:
        console.log('toma video');
        this.tomaVideo();
        break;
    }
  }

  tomaImagen() {
    console.log('tomar imagen');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        console.log('si hay imagen');
        let completo = imageData.split('/');
        console.log(completo);
        console.log(completo.length);
        this.nombre = completo[completo.length - 1];
      }

      this.imageURI = imageData;
    }, (err) => {
    });
  }

  tomaVideo() {
    console.log('toma video');

    const tanamioMaximo = 60 * 1024 * 1024;

    let options: CaptureVideoOptions = { limit: 1, quality: 0 };

    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) => {
          console.log(data);

          if (data[0].size <= tanamioMaximo) {
            this.nombre = data[0].name;
            this.imageURI = data[0].fullPath;
          } else {
            this.presentToast('Se supero el tamaño maximo.');
          }

        },
        (err: CaptureError) => { console.error(err); }
      );
  }

  //   explorar(){
  //     console.log('explorar');

  //     switch(this.tipo){
  //       case 0:
  //       case 1:
  //       case 2:
  //       case 5:
  //       console.log('toma imagen');
  //       this.exploraImagen();
  //       break;
  //       default:
  //       console.log('toma video');
  //       this.exploraVideo();
  //       break;
  //     }
  //   }

  //   exploraImagen(){
  // const options: CameraOptions = {
  //       quality: 100,
  //       destinationType: this.camera.DestinationType.FILE_URI,
  //       sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //       encodingType: this.camera.EncodingType.JPEG,
  //       mediaType: this.camera.MediaType.PICTURE
  //     };

  //     this.camera.getPicture(options).then((imageData) => {
  //       this.imageURI = imageData;
  //     }, (err) => {
  //       console.log(err);
  //       this.presentToast(err);
  //     });
  //   }

  //   exploraVideo(){
  //     const options: CameraOptions = {
  //       quality: 100,
  //       destinationType: this.camera.DestinationType.FILE_URI,
  //       sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //       mediaType: this.camera.MediaType.VIDEO
  //     };

  //     this.camera.getPicture(options).then((imageData) => {
  //       this.imageURI = imageData;
  //     }, (err) => {
  //       console.log(err);
  //       this.presentToast(err);
  //     });
  //   }

  subir() {
    console.log('subir');

    let formato = 'image/jpeg'

    switch (this.tipo) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        formato = 'image/jpeg'
        break;
      default:
        formato = 'video/mp4'
        break;
    }

    let loader = this.loadingCtrl.create({
      content: "Un momento..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'image',
      fileName: this.nombre,
      chunkedMode: false,
      mimeType: formato,
      params: { DoctoId: this.tipo, Extencion: formato, Vin: this.vin }
    };

    fileTransfer.upload(this.imageURI, this.server +
      'cargaimagen?DoctoId=' + this.tipo + '&Extencion=' + formato + '&Vin=' + this.vin, options)
      .then((data: any) => {
        console.log(data + " Uploaded Successfully2");
        console.log(data);
        loader.dismiss();
        this.presentToast("Archivo cargado");
        this.imageURI = null;
        console.log(data.response);
        this.viewCtrl.dismiss({ idDocumento: data.response });
      }, (err) => {
        console.log(err);
        loader.dismiss();
      });
  }

  cerrar() {
    this.viewCtrl.dismiss({ idDocumento: '' });
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
