# WOQU.com前端构建流程

> 基于gulp与webpack，使用须严格按照文件命名规范。

## 项目结构

- src目录
```
woqu/
└── pc
    ├── assets
    │   └── src
    │       ├── components
    │       │   ├── footer
    │       │   │   ├── footer.component.js
    │       │   │   ├── footer.less
    │       │   │   └── footer.png
    │       │   └── header
    │       │       ├── header.component.js
    │       │       ├── header.less
    │       │       └── header.png
    │       ├── css
    │       │   ├── base
    │       │   │   └── normalize.less
    │       │   ├── common
    │       │   │   ├── footer.less
    │       │   │   └── header.less
    │       │   ├── pages
    │       │   │   ├── detail
    │       │   │   │   ├── detail-common.less
    │       │   │   │   └── detail-pack.less
    │       │   │   ├── index
    │       │   │   │   └── index.less
    │       │   │   └── list
    │       │   │       ├── list-common.less
    │       │   │       └── list-pack.less
    │       │   ├── plugins
    │       │   │   └── jquery.slider.less
    │       │   └── style.less
    │       ├── img
    │       │   └── pages
    │       │       ├── channel-icon.png
    │       │       ├── detail
    │       │       │   └── localjoin
    │       │       │       └── channel-icon.png
    │       │       ├── index
    │       │       │   └── channel-icon.png
    │       │       └── list
    │       │           └── channel-icon.png
    │       ├── js
    │       │   ├── base
    │       │   │   └── base.js
    │       │   ├── common
    │       │   │   ├── woqu.common.js
    │       │   │   └── woqu.monitor.js
    │       │   ├── pages
    │       │   │   ├── detail
    │       │   │   │   └── detail-pack.entry.js
    │       │   │   ├── index
    │       │   │   │   └── index.entry.js
    │       │   │   └── list
    │       │   │       ├── list-common.js
    │       │   │       ├── list-localjoin.entry.js
    │       │   │       ├── list-pack.entry.js
    │       │   │       └── pack
    │       │   │           └── pack-special.js
    │       │   ├── plugins
    │       │   │   ├── jquery.cookie.js
    │       │   │   └── jquery.slider.js
    │       │   └── vendors
    │       │       ├── jquery.min.js
    │       │       └── mordenizr.min.js
    │       └── static
    │           ├── detail
    │           │   └── detail-pack.html
    │           ├── index
    │           │   └── index.html
    │           └── list
    │               └── list-pack.html
    ├── gulpfile.js
    └── package.json
```

- dist目录
```
woqu/
└── pc
    ├── assets
    │   ├── dist
    │   │   ├── components
    │   │   │   ├── 853e3ea3d3ae8b7260e61e6a58419847.png
    │   │   │   ├── c6dc7002b33ea85d82e3cccba2238ca8.png
    │   │   │   ├── footer
    │   │   │   │   └── footer.component.js
    │   │   │   └── header
    │   │   │       └── header.component.js
    │   │   ├── css
    │   │   │   ├── base
    │   │   │   │   └── normalize.css
    │   │   │   ├── common
    │   │   │   │   ├── footer.css
    │   │   │   │   └── header.css
    │   │   │   ├── pages
    │   │   │   │   ├── detail
    │   │   │   │   │   ├── detail-common.css
    │   │   │   │   │   └── detail-pack.css
    │   │   │   │   ├── index
    │   │   │   │   │   └── index.css
    │   │   │   │   └── list
    │   │   │   │       ├── list-common.css
    │   │   │   │       └── list-pack.css
    │   │   │   ├── plugins
    │   │   │   │   └── jquery.slider.css
    │   │   │   └── style.css
    │   │   ├── img
    │   │   │   └── pages
    │   │   │       ├── channel-icon.png
    │   │   │       ├── detail
    │   │   │       │   └── localjoin
    │   │   │       │       └── channel-icon.png
    │   │   │       ├── index
    │   │   │       │   └── channel-icon.png
    │   │   │       └── list
    │   │   │           └── channel-icon.png
    │   │   └── js
    │   │       ├── pages
    │   │       │   ├── detail
    │   │       │   │   ├── detail-pack.entry.js
    │   │       │   │   └── detail.base.js
    │   │       │   ├── index
    │   │       │   │   ├── index.base.js
    │   │       │   │   └── index.entry.js
    │   │       │   └── list
    │   │       │       ├── list-localjoin.entry.js
    │   │       │       ├── list-pack.entry.js
    │   │       │       └── list.base.js
    │   │       └── woqu.base.js
    ├── gulpfile.js
    └── package.json
```

## 文件命名规范

> 使用须严格按照该文件命名规范，其中包括入口文件(*.entry.js)、组件入口文件(*.component.js)、业务线划分(business-*.js)等。

- 入口文件(*.entry.js)

- 组件入口文件(*.component.js)

- 业务线划分(business-*.js)
