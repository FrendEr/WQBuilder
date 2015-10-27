# WOQU.com前端构建流程

> 我趣旅行网 (www.woqu.com) 前端构建流程。该方案只涉及了纯前端部分，所以发布上线前仍需要执行旧的前端发布脚本（版本号路径的替换）。

## 核心工具

- [gulp](https://github.com/gulpjs/gulp)
- [gulp-less](https://github.com/plus3network/gulp-less)
- [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)
- [gulp-jshint](https://github.com/spalger/gulp-jshint)
- [webpack](https://github.com/webpack/webpack)

> 备注：完整工具列表请参考 package.json

## 前端框架

- css
> less

- javascript
> commonjs (不依赖于 requirejs 或者 seajs 这类的第三方模块库，使用 webpack 作为模块加载器)

## 打包流程

#### 项目目录
```
assets/
├── dist
│   ├── css
│   ├── img
│   └── js
└── src
    ├── components
    ├── css
    ├── img
    ├── js
    │   ├── common
    │   ├── pages
    │   ├── plugins
    │   ├── standalone
    │   ├── utils
    │   └── vendors
    └── static
```

** src为源文件目录，通过gulp动态监听，实时编译文件到dist目录下，所以开发过程中引用的静态文件路径全部以dist为准。 **
