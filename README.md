# ESModule-demo-study

此项目为内部学习小组分享Demo，ESModule分享样例

## 目的

运用ESM的规范，重写开发服务器，进行vite原理的解析demo，利用demo剖析ESM在未来的表现，和对应产生的打包工具ESbuild带来的便利和效率的提升。

## 项目目录

### 1. esbuild

此为基于ESM规范的esbuild的打包性能简单测试：

```bash
# 进入目录
cd esbuild
# 利用webpack打包的时间
npm run webpack
# 利用esbuild打包的时间
npm run esbuild
# 两者对比
npm run compare
```

一共有两个demo。

### 2. esModule

此项目为简单测试ESM规范下的基于chorme浏览器开发模式，简单引入import和export文件测试样例

```bash
# 进入目录
cd esModule
# 安装依赖
npm i
# 启动ESM开发服务器
npm start
# 打开浏览器 localhost:5555
```

### 3. ReactEsModule

此项目基于esModule提升了一点较为复杂，因为新引入了React模块和React-dom，需要解析对应的模块路径，此为简单项目结构

```bash
# 进入目录
cd ReactEsModule
# 安装依赖
npm i
# 启动ESM开发服务器
npm start
# 打开浏览器 localhost:5555
```

### 4. ReactEsModule-Middleware

此项目基于ReactEsModule项目加入了中间件模式，结构相对来说复杂一点点，此为上个相同斑斑的中间件项目结构

```bash
# 进入目录
cd ReactEsModule-Middleware
# 安装依赖
npm i
# 启动ESM开发服务器
npm start
# 打开浏览器 localhost:5555
```