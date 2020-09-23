# 介绍

qiankun 是一个基于 [single-spa](https://github.com/CanopyTax/single-spa) 的[微前端](https://micro-frontends.org/)实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。

## qiankun主要特点

qiankun具备以下几个核心价值：

- 技术栈无关
  主框架不限制接入应用的技术栈，微应用具备完全自主权

- 独立开发、独立部署
  微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新

- 增量升级
  在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而qiankun是一种非常好的实施渐进式重构的手段和策略

- 独立运行时
  每个微应用之间状态隔离，运行时状态不共享

qiankun旨在解决单体应用在一个相对长的时间跨度下，由于参与的人员、团队的增多、变迁，从一个普通应用演变成一个巨石应用后，随之而来的应用不可维护的问题。这类问题在企业级 Web 应用中尤其常见。

# 快速上手

## 主应用
### 1. 安装 qiankun

```bash
$ yarn add qiankun # 或者 npm i qiankun -S
```

### 2. 在主应用中注册微应用

```ts
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:7100',
    container: '#yourContainer',
    activeRule: '/yourActiveRule',
  },
  {
    name: 'vue app',
    entry: { scripts: ['//localhost:7100/main.js'] },
    container: '#yourContainer2',
    activeRule: '/yourActiveRule2',
  },
]);

start();
```

当微应用信息注册完之后，一旦浏览器的 url 发生变化，便会自动触发 qiankun 的匹配逻辑，所有 activeRule 规则匹配上的微应用就会被插入到指定的 container 中，同时依次调用微应用暴露出的生命周期钩子。

如果需要使用keep-alive(路由复用)，需要使用手动加载微应用的方式：

```ts
import { loadMicroApp } from 'qiankun';

loadMicroApp(
  { 
    name: 'app', 
   	entry: '//localhost:7100',
    container: '#yourContainer', 
  }
);
```

## 微应用 （umi框架）

react使用umi框架的情况下，可以使用umi提供的qiankun插件

```js
export default {
  qiankun: {
    slave: {}
  }
}
```

## 微应用 （非umi框架）

### 1. 导出相应的生命周期钩子

微应用需要在自己的入口 js (通常就是你配置的 webpack 的 entry js) 导出 `bootstrap`、`mount`、`unmount` 三个生命周期钩子，以供主应用在适当的时机调用。

```ts
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log(props);
  ReactDOM.render(<App />, document.getElementById('react15Root'));
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('react15Root'));
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props);
}
```

## 当前待解决的问题

### 1. 主应用和子应用样式污染

主应用angular和子应用react都使用了antD，两个版本的antD存在差异，例如样式名都叫ant-dropdown，但实现内容不同。导致页面展示不如预期。

### 2. 子应用独立运行

子应用独立运行可以带来很多方便，例如：

- 开发阶段可以只启动子应用进行开发联调。
- 每个子应用当做一个模块，独立部署交付，根据需求组合子应用成为一个新的应用。

由于登录权限和部分样式放在主应用，子应用独立运行还存在一些问题。
