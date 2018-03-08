import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { ControlPage } from '../control/control';
import { LoginPage } from '../login/login';
import { InstruccionesBusquedaPage } from '../instrucciones-busqueda/instrucciones-busqueda';
import { DhlServiceProvider } from '../../providers/dhl-service/dhl-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  vin: string;
  unidad: any;

  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public plt: Platform,
    private dhlService: DhlServiceProvider) {
    this.vin = '';
    //this.unidad = {UnidadId : 1};

      // plt.registerBackButtonAction(() => {
      //   console.log('-------------------------hiciste back-----------------');
      //   this.plt.exitApp();
      // });

  }

  buscar() {
    console.log('buscar');  
    this.dhlService.getUnidad(this.vin).subscribe((res:any)=>{
      console.log(res);
      this.unidad = res;
      if(this.unidad && this.unidad.ok == 0){
        this.presentToast('No se encontro la unidad.');
      }
    });
  }

  cargar() {
    console.log('cargar');
    console.log(this.unidad.vin);
    this.navCtrl.setRoot(ControlPage,{vin: this.unidad.vin})
    //this.navCtrl.push(ControlPage,{vin: this.unidad.vin});
  }

  instrucciones(){
    console.log('busqueda por vin, instrucciones');
    this.navCtrl.push(InstruccionesBusquedaPage);
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
