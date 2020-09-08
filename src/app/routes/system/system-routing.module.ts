import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// user pages
import { UserContainerComponent } from './user.component';

const routes: Routes = [
  { path: 'user', component: UserContainerComponent, data: { title: '用户管理' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
