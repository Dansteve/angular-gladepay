import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AngularGladepayDirective } from './angular-gladepay.directive';
import { AngularGladepayService } from './angular-gladepay.service';
import { MID } from './gladepay-mid';

@Component({
  template: `<button type="text"
    class="btn btn-danger m-3"
    angular-Gladepay
    [payment_method]="['card', 'bank']"
    [email]="'mailexample@mail.com'"
    [amount]="'5000000'"
    [MID]="'some-random-str'"
    (paymentInit)="paymentInit()"
    (close)="paymentCancel()"
    (callback)="paymentDone($event)"
    [class]="'btn btn-primary btn-lg'"
  >
    Pay
  </button>
  `
})
class TestComponent {
  paymentInit() {
    return 'initialized';
  }

  paymentDone(ref: any) {
   return 'successful';
  }

  paymentCancel() {
    return 'failed';
  }
}

describe('AngularGladepayDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let payButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularGladepayDirective, TestComponent ],
      providers: [
        AngularGladepayService,
        { provide: MID, useValue: 'MID' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    payButton = fixture.debugElement.query(By.css('button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should make payment', () => {
  //   spyOn(component, "paymentInit")
  //   expect(component).toBeTruthy();
  //   payButton.triggerEventHandler("click", {})
  //   fixture.detectChanges();

  //   expect(component.paymentInit).toHaveBeenCalled()
  // });
});
