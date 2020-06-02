# ANGULAR-GLADEGPAY

> This is an angular module that abstracts the complexity of making gladepay payments with Angular2+.

## USAGE

### 1. Install the module
```sh
npm install --save angular-gladepay
```

### 2. Import the module
In your `app.module.ts` or any module where the component or directive would be used like so:

```ts
import { NgModule } from '@angular/core';

import { AngularGladepayModule } from 'angular-gladepay';
...

@NgModule({
  imports: [
    AngularGladepayModule.forRoot('MID'),
  ]
})

export class AppModule {}
```

### 3. Implement in your project
There are two available options

* **AngularGladepayComponent**: Renders a button which when clicked loads gladepay Inline in an iframe
  ```html
    <angular-gladepay
      [email]="'mailexample@mail.com'"
      [amount]="5000000"
      [payment_method]="['bank']"
      [class]="'btn btn-primary'"
      (close)="paymentCancel()"
      (callback)="paymentDone($event)"
    >
      Pay with Gladepay
    </angular-gladepay>
  ```

*  **AngularGladepayDirective**: A directive that loads gladepay inline in an iframe when clicked
```html
  <button
    angular-gladepay
    [MID]="'MID'"
    [email]="'mailexample@mail.com'"
    [amount]="5000000"
    [class]="'btn btn-primary'"
    (paymentInit)="paymentInit()"
    (close)="paymentCancel()"
    (callback)="paymentDone($event)"
  >
    Pay with Gladepay
  </button>
```

And then in your `component.ts`
```ts
  import { Component, OnInit } from '@angular/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit {
    reference = '';
    constructor() {}

    paymentInit() {
      console.log('Payment initialized');
    }

    paymentDone(ref: any) {
      this.title = 'Payment successfull';
      console.log(this.title, ref);
    }

    paymentCancel() {
      console.log('payment failed');
    }

    ngOnInit() {

    }

  }
```
Also you can use the `gladepayOptions` object like so:
```html
  <button
    angular-gladepay
    [gladepayOptions]="options"
    (paymentInit)="paymentCancel()"
    (close)="paymentCancel()"
    (callback)="paymentDone($event)"
  >
    Pay with Gladepay
  </button>
```

And then in your `component.ts`
```ts
  import { Component } from '@angular/core';
  import { GladepayOptions } from 'angular-gladepay';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    options: GladepayOptions = {
      amount: 50000,
      email: 'user@mail.com',
      MID: ''
    }
    constructor() {}

    paymentInit() {
      console.log('Payment initialized');
    }

    paymentDone(ref: any) {
      this.title = 'Payment successfull';
      console.log(this.title, ref);
    }

    paymentCancel() {
      console.log('payment failed');
    }
  }
```
Also, you can pass in a MID in the component and the directive, in such situation, this MID is given a higher preference over the global `forRoot` MID. For example, if you have this is your file
```ts
@NgModule({
  imports: [
    AngularGladepayModule.forRoot('MID',false),
  ]
})
```
and this in your component
```html
  <button
    angular-gladepay
    [MID]="'MID2'"
    [email]="'mailexample@mail.com'"
    [amount]="5000000"
    [ref]="reference"
    [class]="'btn btn-primary'"
    (paymentInit)="paymentInit()"
    (close)="paymentCancel()"
    (callback)="paymentDone($event)"
  >
    Pay with Gladepay
  </button>
```
Then `MID2` would be used instead


## OPTIONS

|Name                   | Type           | Required            | Default Value       | Description         |
|-----------------------|----------------|---------------------|---------------------|---------------------|
|  `amount `            | `number`       | true                |  undefined          | Amount to withdraw (in kobo for NGN)
|  `email `             | `string`       | true                |  undefined          | The customer's email address.
|  `MID`                | `string`       | true                |  undefined          | Your MID from Gladepay. Use test MID for test mode and live MID for live mode
|  `callback`           | `function`     | true                |  undefined          | A function called when transaction is successful. Returns an object containing unique reference
|  `metadata`           | `object`       | false               |  {}                 | custom details
|  `currency`           | `string`       | false               |  "NGN"              | Transaction currency
|  `gladepayOptions`     | `object`     | false               |  undefined          | An object containing the gladepay options above. **NOTE:** The function listeners eg `callback`, `paymentInit` should not be added here
|  `paymentInit`        | `function`     | false               |  undefined          | A function called when the payment is about to begin
|  `onClose`            | `function`     | false               |  undefined          | A function called if the customer closes the payment window

> For more information checkout [gladepay's documentation](https://developer.glade.ng/docs/#gladepay-inline-checkout)

## Contributing

Please feel free to fork this package and contribute by submitting a pull request to enhance the functionalities.


## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or anywhere? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/dansteveade)!

Thanks!
Dansteve Adekanbi.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.