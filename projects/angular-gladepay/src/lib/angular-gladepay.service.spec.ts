import { TestBed, inject } from '@angular/core/testing';

import { AngularGladepayService } from './angular-gladepay.service';
import { MID } from './gladepay-mid';

describe('AngularGladepayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularGladepayService,
        { provide: MID, useValue: 'MID' }
      ]
    });
  });

  it('should be created', inject([AngularGladepayService], (service: AngularGladepayService) => {
    expect(service).toBeTruthy();
  }));

  it('should inject mids', inject([AngularGladepayService], (service: any) => {
    expect(service.mid).toEqual('MID');
  }));
});
