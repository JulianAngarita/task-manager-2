import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.scss'],
  standalone: false
})
export class ModalInputComponent {

  public newCategory = '';

  constructor(
    private modalCtrl: ModalController
  ) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.newCategory, 'confirm');
  }
}
