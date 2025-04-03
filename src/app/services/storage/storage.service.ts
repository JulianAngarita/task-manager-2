import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { EICategorieList } from '../../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  private init = async () => {
    this._storage = await this.storage.create();
    const exits = await this._storage.get('categorie');
    if (exits) return;
    this._storage.set('categorie', EICategorieList);
  }

  public set = (key: string, value: any) => {
    this._storage?.set(key, value);
  }

  public get = async (key: any): Promise<any> => {
    return await this._storage?.get(key);
  }
}
