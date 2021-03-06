import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { I18NService } from './i18n/i18n.service';

import { ThemeEventService } from './services/event.service';

@NgModule({
  providers: [
    I18NService,
    ThemeEventService,
    NzNotificationService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
