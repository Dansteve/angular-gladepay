import { GladepayOptions } from 'angular-gladepay';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title: string;
  tRef: string;

  options: GladepayOptions = {
    // MID: 'GP0000001',
    title: 'GladePay Test',
    description: 'Experience GladePay Checkout',
    firstname: 'Customer',
    lastname: 'Customer',
    email: 'danstevea@gmail.com',
    amount: 1,
    country: 'NG',
    currency: 'NGN',
    payment_method: ['card', 'bank', 'ussd', 'qr', 'mobilemoney'],
    // logo: 'https://lh3.googleusercontent.com/-rOlOgqQu2gc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmWs88G4Uz3QL1uB6jPJAgatI0muQ/photo.jpg?sz=46'
    logo : 'https://www.glade.ng/favicon-32x32.png'
  };

  constructor() { }

  paymentInit(res: any) {
    console.log('Payment initialized');
  }

  paymentDone(res: any) {
    console.log('Payment Done');
    console.log(res);
  }

  paymentCancel(res: any) {
    console.log('Payment Close');
    console.log(res);
  }

}
