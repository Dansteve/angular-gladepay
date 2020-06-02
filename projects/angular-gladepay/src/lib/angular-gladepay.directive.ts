import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { GladepayOptions, PrivateGladepayOptions } from '../model/gladepay-options';
import { AngularGladepayService } from './angular-gladepay.service';

interface MyWindow extends Window {
  gladepaySDK: {
    initialize(options: Partial<GladepayOptions>): { loadIframe(options): any }
  };
}
declare var window: MyWindow;

@Directive({
  selector: '[angular-Gladepay]',
})
export class AngularGladepayDirective {
  @Input() MID: string;
  @Input() IS_PRODUCTION: boolean;
  @Input() email: string;
  @Input() amount: number;
  @Input() metadata: string;
  @Input() payment_method: string[];
  @Input() country: string;
  @Input() currency: string;
  @Input() firstname: string;
  @Input() lastname: string;
  @Input() phone: string;
  @Input() title: string;
  @Input() logo: string;
  @Input() description: string;
  @Input() bearer: string;
  @Input() gladepayOptions: GladepayOptions;
  @Input() class: string;
  @Input() style: object;
  @Output() paymentInit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onclose: EventEmitter<any> = new EventEmitter<any>(); // tslint:disable-line
  @Output() callback: EventEmitter<any> = new EventEmitter<any>();
  private _GladepayOptions: Partial<PrivateGladepayOptions>; // tslint:disable-line
  private isPaying = false;

  constructor(private GladepayService: AngularGladepayService) { }

  async pay() {
    let errorText = '';
    if (this.gladepayOptions && Object.keys(this.gladepayOptions).length >= 2) {
      errorText = this.validateInput(this.gladepayOptions);
      this.generateOptions(this.gladepayOptions);
    } else {
      errorText = this.validateInput(this);
      this.generateOptions(this);
    }
    if (errorText) {
      console.error(errorText);
      return errorText;
    }
    await this.GladepayService.loadScript();
    // if (this.isPaying) { return; }
    if (this.paymentInit.observers.length) {
      this.paymentInit.emit();
    }
    console.log(window);
    const payment = window.gladepaySDK.initialize(this._GladepayOptions);
    payment.loadIframe(this._GladepayOptions);
    // this.isPaying = false;
  }

  validateInput(obj: GladepayOptions) {
    if (!this.callback.observers.length) {
      return 'ANGULAR-Gladepay: Insert a callback output like so (callback)=\'PaymentComplete($event)\' to check payment status';
    }
    return this.GladepayService.checkInput(obj);
  }

  generateOptions(obj: GladepayOptions) {
    this._GladepayOptions = this.GladepayService.getGladepayOptions(obj);
    this._GladepayOptions.onclose = (...response) => {
      if (this.onclose.observers.length) {
        this.onclose.emit(...response);
      }
    };
    this._GladepayOptions.callback = (...response) => {
      this.callback.emit(...response);
    };
  }

  @HostListener('click')
  async buttonClick() {
    this.pay();
  }
}
