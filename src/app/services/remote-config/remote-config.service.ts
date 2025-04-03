import { inject, Injectable } from '@angular/core';
import { RemoteConfig } from '@angular/fire/remote-config';
import { getBoolean } from 'firebase/remote-config';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {

  private readonly remoteConfig: RemoteConfig = inject(RemoteConfig);

  constructor() { }

  showAppbarIcon(): boolean {
    console.log(getBoolean(this.remoteConfig, 'light_mode'));
    return getBoolean(this.remoteConfig, 'light_mode');
  }
}
