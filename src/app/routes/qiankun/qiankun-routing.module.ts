import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// react app pages
import { ReactContainerComponent } from './react-container.component';

const routes: Routes = [
  { path: 'system/user', component: ReactContainerComponent, data: { title: '用户管理' } },
  { path: 'system/role', component: ReactContainerComponent, data: { title: '角色管理' } },
  { path: 'system/department', component: ReactContainerComponent, data: { title: '部门管理' } },
  { path: 'system/menu', component: ReactContainerComponent, data: { title: '菜单管理' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QiankunRoutingModule { }
