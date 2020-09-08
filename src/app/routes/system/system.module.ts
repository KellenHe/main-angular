import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SystemRoutingModule } from './system-routing.module';

// user pages
import { UserContainerComponent } from './user.component';

const COMPONENTS = [
  UserContainerComponent
];

@NgModule({
  imports: [SharedModule, SystemRoutingModule],
  declarations: [
    ...COMPONENTS
  ]
})
export class SystemModule { }
