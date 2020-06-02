import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularGladepayComponent } from './angular-gladepay.component';
import { AngularGladepayService } from './angular-gladepay.service';
import { MID } from './gladepay-mid';

describe('AngularGladepayComponent', () => {
  let component: AngularGladepayComponent;
  let fixture: ComponentFixture<AngularGladepayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AngularGladepayComponent],
      providers: [
        AngularGladepayService,
        { provide: MID, useValue: 'MID' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularGladepayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not load the modal when the amount is not provided', async () => {
    spyOn(component.paymentInit, 'emit');
    component.email = 'someuser@email.com';
    component.MID = 'Merchant ID';
    component.callback.subscribe(() => { });
    const error = await component.pay();

    fixture.detectChanges();
    expect(error).toEqual('ANGULAR-Gladepay: Gladepay amount cannot be empty');
    expect(component.paymentInit.emit).not.toHaveBeenCalled();
  });

  it('should not load the modal when the email is not provided', async () => {
    spyOn(component.paymentInit, 'emit');
    component.MID = 'Merchant ID';
    component.amount = 50000;
    component.callback.subscribe(() => { });
    const error = await component.pay();

    fixture.detectChanges();
    expect(error).toEqual('ANGULAR-Gladepay: Gladepay email cannot be empty');
    expect(component.paymentInit.emit).not.toHaveBeenCalled();
  });

  it('should not load the modal when MID is not provided', async () => {
    spyOn(component.paymentInit, 'emit');
    component.email = 'someuser@email.com';
    component.amount = 50000;
    component.callback.subscribe(() => { });
    const error = await component.pay();

    fixture.detectChanges();
    expect(error).toEqual('ANGULAR-Gladepay: Gladepay MID cannot be empty');
    expect(component.paymentInit.emit).not.toHaveBeenCalled();
  });

  it('should prefer MID used by component', async () => {
    spyOn(component.paymentInit, 'emit');
    component.email = 'someuser@email.com';
    component.amount = 50000;
    component.MID = 'Merchant ID';
    component.callback.subscribe(() => { });
    const error = await component.pay();

    fixture.detectChanges();
    expect(error).toEqual('ANGULAR-Gladepay: Gladepay ref cannot be empty');
    expect(component.paymentInit.emit).not.toHaveBeenCalled();
    expect(component._GladepayOptions.MID).toEqual(component.MID);
  });

  it('should not load with incomplete GladepayOptions object', async () => {
    spyOn(component.paymentInit, 'emit');
    component.GladepayOptions = {
      email: 'someuser@email.com',
      MID: 'Merchant ID',
      amount: 50000,
    };
    component.callback.subscribe(() => { });
    component.paymentInit.subscribe(() => { });
    const error = await component.pay();

    fixture.detectChanges();
    expect(error).toEqual('ANGULAR-Gladepay: Gladepay ref cannot be empty');
    expect(component.paymentInit.emit).not.toHaveBeenCalled();
  });

  it('should accept the GladepayOptions object', async () => {
    spyOn(component.paymentInit, 'emit');
    component.GladepayOptions = {
      email: 'someuser@email.com',
      MID: 'Merchant ID',
      amount: 50000,
    };
    component.callback.subscribe(() => { });
    component.paymentInit.subscribe(() => { });
    const error = await component.pay();

    fixture.detectChanges();
    expect(error).toBeUndefined();
    expect(component.paymentInit.emit).toHaveBeenCalled();
  });

  it('should load the modal when parameters are passed', async () => {
    spyOn(component.paymentInit, 'emit');
    component.email = 'someuser@email.com';
    component.MID = 'Merchant ID';
    component.amount = 50000;
    component.callback.subscribe(() => { });
    component.paymentInit.subscribe(() => { });
    const error = await component.pay();

    fixture.detectChanges();
    expect(error).toBeUndefined();
    expect(component.paymentInit.emit).toHaveBeenCalled();
  });
});
