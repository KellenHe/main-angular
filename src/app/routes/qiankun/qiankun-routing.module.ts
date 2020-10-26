import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// react app pages
import { ReactContainerComponent } from './react-container.component';

const routes: Routes = [
  { path: 'system/user', component: ReactContainerComponent, data: { title: '用户管理' } },
  { path: 'system/role', component: ReactContainerComponent, data: { title: '角色管理' } },
  { path: 'system/department', component: ReactContainerComponent, data: { title: '部门管理' } },
  { path: 'system/menu', component: ReactContainerComponent, data: { title: '菜单管理' } },
  { path: 'ops/task', component: ReactContainerComponent, data: { title: '任务管理' } },
  { path: 'flow/config', component: ReactContainerComponent, data: { title: '流程配置' } },
  { path: 'system/authority_data', component: ReactContainerComponent, data: { title: '权限配置' } },
  { path: 'ops/database', component: ReactContainerComponent, data: { title: '数据库管理' } },
  { path: 'ops/server', component: ReactContainerComponent, data: { title: '服务器管理' } },
  { path: 'ops/dict', component: ReactContainerComponent, data: { title: '字典管理' } },
  { path: 'ops/file', component: ReactContainerComponent, data: { title: '文件管理' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QiankunRoutingModule { }
