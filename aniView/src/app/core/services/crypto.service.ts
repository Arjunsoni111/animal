import { Injectable, Inject } from '@angular/core';
import * as CryptoJS from 'crypto-js';
// import { appConfig } from '../../app.config';
import { APP_CONFIG, AppConfig } from '../../app-config.module';

@Injectable()
export class CryptoService {
  OBJ: object;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) { }
  decryptData(req) {
    this.OBJ = {};
    // Convert to Base64
    // Decrypt Message
    if (req) {
      const decrypted = CryptoJS.AES.decrypt(req, this.config.cryptopass);
      const c = decrypted.toString(CryptoJS.enc.Utf8);
      try {
        if (c)
          this.OBJ = JSON.parse(c);
      } catch (err) {

      }
      return this.OBJ;
      // Return decrypted value
    } else {
      return this.OBJ;
    }
  }
  encryptData(req) {
    let c;
    try {
      req = JSON.stringify(req);
      const key = CryptoJS.enc.Base64.parse(this.config.cryptopass);
      const encrypted = CryptoJS.AES.encrypt(req, this.config.cryptopass);
      c = encrypted.toString();
    } catch (err) {
    }
    // Return the encrypted value
    return c;
  }

}
