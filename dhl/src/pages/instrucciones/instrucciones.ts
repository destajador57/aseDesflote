import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-instrucciones',
  templateUrl: 'instrucciones.html',
})
export class InstruccionesPage {

  instrucciones: Array<string>;

  constructor(public navCtrl: NavController, 
    public plt: Platform,
    public app: App,
    public navParams: NavParams) {
    this.instrucciones = ['1.data una vuleta', '2.echate a mis pies', '3.perrea'];

    // this.plt.registerBackButtonAction(() => {
    //   console.log('-------------------------instrucciones back 2-----------------');
    //   if(this.navCtrl.canGoBack()){
    //     console.log('retornado usando el pop');
    //     this.navCtrl.pop();
    //   }else{
    //     console.log('ya no puede retornar');
    //   }
    // });

  }

  ionViewDidLoad() {

  }

  salir() {
    this.navCtrl.setRoot(LoginPage);
  }
}
