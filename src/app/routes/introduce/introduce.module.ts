import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { IntroduceRoutingModule } from './introduce-routing.module';

// introduce pages
import { IntroduceComponent } from './introduce.component';
// qiankun pages
import { IntroduceQiankunComponent } from './qiankun/qiankun.component';

const COMPONENTS = [
  IntroduceComponent,
  IntroduceQiankunComponent
];

@NgModule({
  imports: [SharedModule, IntroduceRoutingModule],
  declarations: [
    ...COMPONENTS
  ]
})
export class IntroduceModule { }
