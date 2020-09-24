import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { QiankunRoutingModule } from './qiankun-routing.module';

// user pages
import { ReactContainerComponent } from './react-container.component';

const COMPONENTS = [
  ReactContainerComponent
];

@NgModule({
  imports: [SharedModule, QiankunRoutingModule],
  declarations: [
    ...COMPONENTS
  ]
})
export class QiankunModule { }
