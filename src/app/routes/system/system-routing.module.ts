import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// user pages
import { UserContainerComponent } from './user.component';
// role pages
import { RoleContainerComponent } from './role.component';
// dep pages
import { DepContainerComponent } from './dep.component';
// menu pages
import { MenuContainerComponent } from './menu.component';

const routes: Routes = [
  { path: 'user', component: UserContainerComponent, data: { title: '用户管理' } },
  { path: 'role', component: RoleContainerComponent, data: { title: '角色管理' } },
  { path: 'department', component: DepContainerComponent, data: { title: '部门管理' } },
  { path: 'menu', component: MenuContainerComponent, data: { title: '菜单管理' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
