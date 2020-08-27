import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ComponentsRoutingModule } from './components-routing.module';

// icon pages
import { IconDemoComponent } from './icon/icon.component';
// button pages
import { ButtonDemoComponent } from './button/button.component';
// color pages
import { ColorDemoComponent } from './color/color.component';
// typography pages
import { TypographyDemoComponent } from './typography/typography.component';

const COMPONENTS = [
  IconDemoComponent,
  ButtonDemoComponent,
  ColorDemoComponent,
  TypographyDemoComponent
];

@NgModule({
  imports: [SharedModule, ComponentsRoutingModule],
  declarations: [
    ...COMPONENTS
  ]
})
export class ComponentsModule { }
