## 如何使用

### angular基座项目

现存项目需要做一些修改适配，目前需要手工copy做一些修改，后面会加入npm命令的形式自动修改。

- 安装qiankun
```bash
$ yarn add qiankun # 或者 npm i qiankun -S
```
- 复制/routes/qiankun文件夹下的所有文件，到现存项目相应目录下。
- 修改/routes/routes-routing.module.ts, 在路由中添加qiankun路由配置
```ts
{ path: '', loadChildren: () => import('./qiankun/qiankun.module').then(m => m.QiankunModule) },
```
- 复制/core/startup/startup.service.ts，到现存项目相应目录下。
- 修改environment下配置文件，添加reactAppAddress属性，值为react子项目地址，例如：
```ts
reactAppAddress: '//10.100.44.126:8001/'
```

### react子项目

clone `http://gitlab1.chinacscs.com/framework/front.git` 后在\micro_apps\react下为子项目代码，执行yarn start即可运行。
