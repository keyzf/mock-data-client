# MockHub

MockHub 是一个基于 Vue + Node.js 实现的 API Mock 工具

client:

- vue
- element

server

- node
- koa
- typescript
- mysql

## DEMO

`http://47.96.110.34:9999`

## feature

- 拥有仓库、API、Mock 三个维度，展示每个仓库下的所有 API，以及 API 已保存的多种 Mock 数据
- API 支持 JSON、HAR 格式文件的导入，导入结果可以选则性上传，支出导入到已有仓库以及新建仓库
- Mock 数据支持在线编辑、复制与下载

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 数据导入

### 数据同步方式 dataSync

#### 完全覆盖

> merge: 不保留旧数据，完全使用新数据

#### 智能合并

> good: 已存在的接口，将合并返回数据的 response

#### 普通模式

> normal: 不导入已存在的接口

### har 模式导入

### docker/nginx.conf

这里用 proxy_pass 做了前端接口转发，注意 location ^~ /api/ 中后面需要有斜杆，否则会出现 Malicious Path 问题

<https://blog.csdn.net/yy3306553/article/details/103253254>

### TODO 追踪

#### 6-17 TODO

**版本号：V0.02**

- [x] 1. 【client】导入 API 页面，再次刷新之后，选择仓库显示 NaN
- [x] 2. 【client】文件类型选择 JSON，上传 .har 文件，目前是控制台报错，可以做个文件后缀校验
- [x] 3. 【client】 目前复制功能不起作用，同时复制成功的提示语显示 [object Object]
- [x] 4. 【client】希望可以复制单行
- [x] 5. 【client】先点击左侧接口编辑按钮，不做任何操作关闭弹窗，再点击新建 Mock, 弹窗中数据 项不可输入
- [x] 6. 【client】编辑数据点击 - + 后没保存，页面刷新后还是旧数据
- [x] 7. 【client】修改接口名称，鼠标滑动准备选择文本，导致弹框关闭
- [x] 8. 【client】地址复制后，复制结果左右不应该有 “”，还得手动去除
- [x] 9. 【client】将本地 mock 数据作为接口数据，都不符合 JSON 规范（因为 key 没有用 “” 包裹，可以集成个 JSON 格式化工具，或者推荐个 JSON 格式化插件）
- [x] 10. 【client+server】导入 API 的时候支持创建一个新仓库
- [x] 11. 【server】新建仓库 需要修改数据库字段 name -> moduleName desc -> name
- [x] 12. 【server】内网第二次升级

#### 6-18 TODO

**版本号：V0.03**

- [ ] 1. 使用手册编写
- [x] 2. 【client】操作 res 中复制 JSON 样式统一
- [x] 3. 【server】批量导入接口返回导入成功数量
- [x] 4. 【client】拖拽 res 的时候更新 resMock 的 updateAt
- [x] 5. 【server】提供 sort 接口，可以对接口 mock repo 排序
- [ ] 6. 【server】升级的 shell 脚本
- [x] 7. 【client】导入接口自动跳转到仓库 修改数据库字段 desc -> description
- [x] 8. 【server】参数校验

#### 6-19 TODO

- [ ] 1. 【server】处理多个仓库的接口重复情况下，请求的时候，取哪个返回值
- [x] 2. 【client】调整了布局，首页加载时 loading
- [x] 3. 【client】修复 response 字段不发正常编辑的问题

     - - [x] 方案一，请求的时候指定仓库名 /find-crowd/api/getData
     - - [ ] 方案二，统一管理公用接口，或者有一个 config 页面，可以指定返回某个 mockdata
     - - [ ] 方案三，对于 getLoginInfo 这个接口可以默认返回一个超级权限
     - - [x] 方案四，请求的时候，加入一个 header,读取 header 中仓库名字，返回指定的仓库中的 res

- [x] 4. 【client】仓库的名字不能不相同

#### 6-23 TODO

- [x] 1. 【server】增加复制移动 Interface 接口
- [x] 2. 【client】增加复制移动 interface 功能

#### 二期需求

- [ ] 1.  直接发送请求，获取到 response 且可以保存

##### 7-6 周 TODO

- [x] 1.  显示更新时间
- [x] 2.  code mirror bug fix
- [ ] 3. 优化 API 导入方式--重复 api 的合并策略
- [ ] 4. 收集路由信息自动生成路由
- [ ] 5. 改善 TS 使用，微重构
- [x] 6. 修改 mock data 的优先级应用
- [x] 9. 接口列表中的每个接口，hover 显示完整 api
- [x] 10. 编辑数据，例如很长的对象数组，希望可以点击将对象展开或关闭

##### 7-16 周TODO

- [ ] 1. 可以搜多全局的api，都在哪些仓库拥有，现在模块查询报错了
- [ ] 2. 修复带有仓库名的指定接口返回
- [ ] 3. 接口列表中搜索修复，新建仓库之后不要跳转页面
- [ ] 4. 接口列表中搜索修复，新建仓库之后不要跳转页面




