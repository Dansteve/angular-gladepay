import { Injectable, Inject } from '@angular/core';
import { MID, IS_PRODUCTION } from './gladepay-mid';
import { GladepayOptions } from '../model/gladepay-options';

interface MyWindow extends Window {
  gladepaySDK: {
    initialize(options: Partial<GladepayOptions>): { loadIframe(options): any }
  };
}
declare var window: MyWindow;

@Injectable({
  providedIn: 'root',
})
export class AngularGladepayService {
  // tslint:disable-next-line:ban-types
  constructor(@Inject(MID) private mid: string, @Inject(IS_PRODUCTION) private production: Boolean = false) { }

  loadScript(): Promise<void> {
    return new Promise(resolve => {
      if (window.gladepaySDK && typeof window.gladepaySDK.initialize === 'function') {
        resolve();
        return;
      }
      const script = window.document.createElement('script');
      window.document.head.appendChild(script);
      const onLoadFunc = () => {
        script.removeEventListener('load', onLoadFunc);
        resolve();
      };
      script.addEventListener('load', onLoadFunc);
      if (this.production) {
        script.setAttribute('src', 'https://api.gladepay.com/checkout.js');
      } else {
        script.setAttribute('src', 'https://demo.api.gladepay.com/checkout.js');
      }
      console.log('loaded');
    });
  }

  checkInput(obj: Partial<GladepayOptions>): string {
    if (!obj.MID && !this.mid) {
      return 'ANGULAR-Gladepay: Please insert a your Merchant ID';
    }
    if (!obj.email) {
      return 'ANGULAR-Gladepay: Gladepay email cannot be empty';
    }
    if (!obj.amount) {
      return 'ANGULAR-Gladepay: Gladepay amount cannot be empty';
    }
    return '';
  }

  getGladepayOptions(obj: GladepayOptions): GladepayOptions {
    const gladepayOptions: GladepayOptions = {
      MID: obj.MID || this.mid,
      email: obj.email,
      amount: obj.amount,
      firstname: obj.firstname || '',
      lastname: obj.lastname || '',
      title: obj.title || '',
      description: obj.description || '',
      country: obj.country || '',
      metadata: JSON.stringify(obj.metadata || {}),
      currency: obj.currency || 'NGN',
      payment_method: obj.payment_method || ['card'],
      logo: obj.logo || '',
      bearer: obj.bearer || '',
      recurrent: obj.recurrent || null,
      installment: obj.installment || null,
      split: obj.split || null
    };
    return this.clean(gladepayOptions);
  }

  clean(obj: GladepayOptions) {
    // tslint:disable-next-line:prefer-const
    for (let propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  }
}
