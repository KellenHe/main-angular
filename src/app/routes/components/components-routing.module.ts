import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// icon pages
import { IconDemoComponent } from './icon/icon.component';
// button pages
import { ButtonDemoComponent } from './button/button.component';
// color pages
import { ColorDemoComponent } from './color/color.component';
// typography pages
import { TypographyDemoComponent } from './typography/typography.component';

const routes: Routes = [
  { path: 'icon', component: IconDemoComponent, data: { title: '图标' } },
  { path: 'button', component: ButtonDemoComponent, data: { title: '按钮' } },
  { path: 'color', component: ColorDemoComponent, data: { title: '色彩' } },
  { path: 'typography', component: TypographyDemoComponent, data: { title: '文字' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
