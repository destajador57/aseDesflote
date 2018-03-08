import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-instrucciones-busqueda',
  templateUrl: 'instrucciones-busqueda.html',
})
export class InstruccionesBusquedaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstruccionesBusquedaPage');
  }

}
