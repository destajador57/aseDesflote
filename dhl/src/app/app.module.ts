import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CapturaPage } from '../pages/captura/captura';
import { ControlPage } from '../pages/control/control';
import { InstruccionesPage } from '../pages/instrucciones/instrucciones';
import { InstruccionesBusquedaPage } from '../pages/instrucciones-busqueda/instrucciones-busqueda';
import { DhlServiceProvider } from '../providers/dhl-service/dhl-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CapturaPage,
    ControlPage,
    LoginPage,
    InstruccionesPage,
    InstruccionesBusquedaPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CapturaPage,
    ControlPage,
    LoginPage,
    InstruccionesPage,
    InstruccionesBusquedaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    Camera,
    LocalNotifications,
    MediaCapture,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DhlServiceProvider
  ]
})
export class AppModule {}
