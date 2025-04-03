import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    AppRoutingModule
  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy 
  },
  provideFirebaseApp(() => initializeApp({
    projectId: "task-manager-25858",
    appId: "1:311543575753:web:b74a4c12794b7ce3cc8918",
    storageBucket: "task-manager-25858.firebasestorage.app",
    apiKey: "AIzaSyDpL-3jnFgjIu8fJAOhKeMtEdmIrYDZpT0",
    authDomain: "task-manager-25858.firebaseapp.com",
    messagingSenderId: "311543575753" })),
    provideRemoteConfig(() => getRemoteConfig())],
  bootstrap: [AppComponent],
})
export class AppModule {}
