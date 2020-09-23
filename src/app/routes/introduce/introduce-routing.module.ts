import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// introduce pages
import { IntroduceComponent } from './introduce.component';
// qiankun pages
import { IntroduceQiankunComponent } from './qiankun/qiankun.component';

const routes: Routes = [
  { path: '', component: IntroduceComponent, data: { title: '介绍' } },
  { path: 'qiankun', component: IntroduceQiankunComponent, data: { title: 'qiankun介绍' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntroduceRoutingModule { }
