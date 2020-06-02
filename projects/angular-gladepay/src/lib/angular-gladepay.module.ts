import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularGladepayComponent } from './angular-gladepay.component';
import { AngularGladepayDirective } from './angular-gladepay.directive';
import { AngularGladepayService } from './angular-gladepay.service';
import { MID, IS_PRODUCTION } from './gladepay-mid';

@NgModule({
  imports: [CommonModule],
  exports: [AngularGladepayComponent, AngularGladepayDirective],
  declarations: [AngularGladepayComponent, AngularGladepayDirective],
  providers: [],
})
export class AngularGladepayModule {
  // tslint:disable-next-line:variable-name
  static forRoot(mid: string, is_production: boolean = false): ModuleWithProviders {
    return {
      ngModule: AngularGladepayModule,
      providers: [
        AngularGladepayService,
        { provide: MID, useValue: mid },
        { provide: IS_PRODUCTION, useValue: is_production }
      ]
    };
  }
}
