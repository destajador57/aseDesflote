import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DhlServiceProvider } from '../../providers/dhl-service/dhl-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario: { email: string, password: string };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dhlService: DhlServiceProvider,
    public toastCtrl: ToastController) {
    this.usuario = { email: '', password: '' };
  }

  ionViewDidLoad() {

  }

  login() {
    this.dhlService.Login(this.usuario.email, this.usuario.password).subscribe((res: { ok: number }) => {
      console.log(res);
      //this.navCtrl.setRoot(HomePage);
      if (res.ok > 0) {
        this.navCtrl.setRoot(HomePage);
      } else {
        this.usuario.email = '';
        this.usuario.password = '';
        this.presentToast('El usuario o el password es incorrecto.');
      }
    });
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
