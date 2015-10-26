/* =================================
 *
 * @author  Frend
 * @github  https://github.com/FrendEr/woqu-builder
 * @tips    此流程已经适应项目大部分需求，不再更新，最新版本以github上为准
 * @update  - ES6 support (支持ES6编译)
 *          - components support (支持组件打包)
 *          - test case support (支持测试)
 *
 * =================================
 */

var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var colors = require('colors');

console.log('gulp starting...'.green);

/*
 * style modules
 *
 * @include: less compile
 * @include: css minify
 * @include: css auto prefix
 *
 */
var less = require('gulp-less');
var lessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new lessPluginCleanCSS({
        advanced: true,
        keepSpecialComments: 0
    });
var lessPluginAutoPrefixer = require('less-plugin-autoprefix'),
    autoprefixer = new lessPluginAutoPrefixer({ browsers: ['last 2 versions'] });

gulp.task('style', function() {
    return gulp.src('assets/src/css/**/*.less')
        .pipe(less({
            plugins: [autoprefixer, cleancss]
        }))
        .pipe(gulp.dest('assets/dist/css'));
});

/*
 * image modules
 *
 * @include: image min
 *
 */
var imagemin = require('gulp-imagemin');

gulp.task('image', function() {
    return gulp.src('assets/src/img/**/')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/dist/img'));
});

/*
 * script modules
 *
 * @include: webpack
 * @include: uglify(prod)
 * @include: clean['standalone']
 * @include: copy['standalone']
 * @include: jshint
 *
 */

/*
 * 打包脚本前要确保所有指定目录下地脚本通过验证
 */
var jshint = require('gulp-jshint');
var map = require('map-stream');
gulp.task('jshint', function() {
    var jshintReporter = map(function (file, callback) {
        if (!file.jshint.success) {
            var errors = file.jshint.results;

            console.log('\nJSHint error message: '.red.bold);
            console.log('File  Path : '.yellow.bold + file.path);
            console.log('Error Count: '.yellow.bold + errors.length);

            for (var i = 0; i < errors.length; i++) {
                var error = errors[i].error;
                console.log('================ ' + 'error '.red + colors.red(i + 1) + ' ================');
                console.log('raw       : '.bold + error.raw);
                console.log('evidence  : '.bold + error.evidence);
                console.log('line      : '.bold + error.line);
                console.log('character : '.bold + error.character);
                console.log('reason    : '.bold + error.reason);
                console.log('=========================================\n');
            }
        }
        callback(null, file);
    });

    return gulp.src([
            './assets/src/js/common/**/*.js',
            './assets/src/js/utils/**/*.js',
            './assets/src/js/pages/**/*.js',
            './assets/src/js/plugins/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jshintReporter);
});

/*
 * 打包脚本前清空dist/js/standalone
 */
var del = require('del');
gulp.task('clean', function() {
   return del([
       path.join(__dirname, 'assets/dist/js/standalone') + '/**/*.js'
   ]);
});

var webpack = require('webpack');
var find = require('find');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

/*
 * keyword desction
 *
 * @channel  : 频道页
 * @list     : 列表页
 * @detail   : 详情页
 * @order    : 下单页
 * @pay      : 支付页
 * @album    : 专辑页
 * @activity : 活动页
 * @about    : 周边页
 *
 * 备注: 目前租车、酒店、欧铁业务线暂不考虑
 *
 */
var keywordMap = ['vip'/*'index', 'list', 'detail', 'channel', 'order', 'pay', 'activity', 'about'*/];

gulp.task('script', ['clean', 'jshint'], function() {
    // 适配不同的操作系统的路径规则
    var platform = process.platform,
        slash = /^win/.test(platform) ? '\\' : '/';

    find.file(/\.entry\.js$/, path.resolve(__dirname, './assets/src/'), function(files) {
        var dirArr  = [],                  // 每个文件对应的目录，到/js一级
            entry   = {},                  // 项目所有的入口文件
            plugins = [],                  // chunks数组
            keywordArrMap = {};            // 创建一个空的映射表，用来存储功能页面对应的文件目录数组

        for (var i = 0; i < keywordMap.length; i++) {
            keywordArrMap[keywordMap[i]] = [];
        }

        for (var i = 0; i < files.length; i++) {
            var file = files[i].replace(/\.js$/, ''),
                dir = file.split('js' + slash)[1];

            dirArr.push(dir);
            entry[dir] = file;

            // 按照功能划分，每个功能关联的页面目录
            for (var j = 0; j < keywordMap.length; j++) {
                if (file.indexOf(keywordMap[j]) !== -1) {
                    keywordArrMap[keywordMap[j]].push(dir);
                }
            }
        }

        // 按照功能划分，页面的基础脚本，例如：list.base.js、detail.base.js
        for (var i = 0; i < keywordMap.length; i++) {
            dirArr.push(keywordMap[i] + '.base');
        }

        // 初始化chunks数组
        for (var i = 0; i < keywordMap.length; i++) {
            var keywordItem = keywordMap[i],
                chunks = keywordArrMap[keywordItem],
                ccpObj = new CommonsChunkPlugin({
                name: keywordItem + '.base',
                filename: 'pages/' + keywordItem + '/' + keywordItem + '.base.js',
                chunks: chunks,
                minChunks: chunks.length
            });

            plugins.push(ccpObj);
        }
        // 全站基础脚本，woqu.base.js
        plugins.push(new CommonsChunkPlugin({
            name: 'woqu.base',
            filename: 'woqu.base.js',
            chunks: dirArr,
            minChunks: 2
        }));
        // 压缩脚本
        // @usage cli: NODE_ENV=prod gulp TODO
        if (process.env.NODE_ENV === 'prod') {
            plugins.push(new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                mangle: true       // 变量命名有损压缩，default false
            }));
        }

        webpack({
            entry: entry,
            output: {
                path: path.join(__dirname, 'assets/dist/js'),
                filename: '[name].js'
            },
            plugins: plugins,
            module: {
                loaders: [
                    // 支持脚本文件es6编译
                    // {
                    //     test: /\.js$/,
                    //     exclude: /(node_modules|bower_components|vendors|standalone)/,
                    //     loader: 'babel-loader'
                    // },
                    // 加载模板文件，默认使用.dot拓展名，使用dot作为模板引擎
                    {
                        test: /\.dot$/,
                        loader: 'html-loader'
                    }
                ]
            }
        }, function(err) {
            if (err) console.log('webpack script error!'.red);
        });

        // standalone files copy
        gulp.src(path.join(__dirname, 'assets/src/js/standalone') + '/**/*.js')
            .pipe(gulp.dest(path.join(__dirname, 'assets/dist/js/standalone')));

    }).error(function() {
        console.log('find js files error!'.red);
    });
});

/*
 * components modules
 *
 */
// 备注：组件目前用于测试。由于版本号原因，目前不能在生产环境使用。
gulp.task('components', function() {
    webpack({
        entry: {
            'header/header.component': '/Users/frend/Documents/Frend/Github-Repo/FrendEr/woqu-builder/woqu/pc/assets/src/components/header/header.component',
            'footer/footer.component': '/Users/frend/Documents/Frend/Github-Repo/FrendEr/woqu-builder/woqu/pc/assets/src/components/footer/footer.component'
        },
        output: {
            path: path.join(__dirname, 'assets/dist/components'),
            filename: '[name].js',
            publicPath: '//quimg.com/pc/assets/dist/components/'
        },
        module: {
            loaders: [
                { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
                { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=1024' }
            ]
        }
    }, function(err, stats) {
        if (err) console.log('webpack components error!'.red);
    });
});

/*
 * watch modules
 *
 * @include: watch files change
 *
 */
var watch = require('gulp-watch');

gulp.task('watch', function() {
    // watch files add event
    watch(['./assets/src/**/*']).on('add', function(file) {
        var extname = path.extname(file);

        switch(extname) {
            case '.png':
            case '.jpg':
            case '.jpeg':
            case '.gif':
                console.log('\nadd image!'.yellow);
                gulp.start('image', function(err) {
                    if (err) throw err;
                    console.log('√ image reloaded!\n'.green);
                });
                break;
            case '.css':
            case '.less':
                console.log('\nadd style!'.yellow);
                gulp.start('style', function(err) {
                    if (err) throw err;
                    console.log('√ style reloaded!\n'.green);
                });
                break;
            case '.js':
            case '.coffee':
                console.log('\nadd script!'.yellow);
                gulp.start('script', function(err) {
                    if (err) throw err;
                    console.log('√ script reloaded!\n'.green);
                });
                break;
            case '.dot':
                console.log('\nadd dot template!'.yellow);
                gulp.start('script', function(err) {
                    if (err) throw err;
                    console.log('√ script reloaded!\n'.green);
                });
                break;
            default:
                break;
        }
    });

    // watch files change event
    watch(['./assets/src/**/*']).on('change', function(file) {
        var extname = path.extname(file);

        switch(extname) {
            case '.png':
            case '.jpg':
            case '.jpeg':
            case '.gif':
                console.log('\nimage change!'.red);
                gulp.start('image', function(err) {
                    if (err) throw err;
                    console.log('√ image reloaded!\n'.green);
                });
                break;
            case '.css':
            case '.less':
                console.log('\nstyle change!'.yellow);
                gulp.start('style', function(err) {
                    if (err) throw err;
                    console.log('√ style reloaded!\n'.green);
                });
                break;
            case '.js':
            case '.coffee':
                console.log('\nscript change!'.yellow);
                gulp.start('script', function(err) {
                    if (err) throw err;
                    console.log('√ script reloaded!\n'.green);
                });
                break;
            case '.dot':
                console.log('\ndot template change!'.yellow);
                gulp.start('script', function(err) {
                    if (err) throw err;
                    console.log('√ script reloaded!\n'.green);
                });
                break;
            default:
                break;
        }
    });

    // watch files delete event
    watch(['./assets/src/**/*']).on('unlink', function(file) {
        var extname = path.extname(file);

        switch(extname) {
            case '.png':
            case '.jpg':
            case '.jpeg':
            case '.gif':
                console.log('\nunlink image!'.red);
                fs.unlink(file.replace('src', 'dist'));
                gulp.start('image', function(err) {
                    if (err) throw err;
                    console.log('√ image reloaded!\n'.green);
                });
                break;
            case '.css':
            case '.less':
                console.log('\nunlink style!'.red);
                fs.unlink(file.replace('src', 'dist'));
                gulp.start('style', function(err) {
                    if (err) throw err;
                    console.log('√ style reloaded!\n'.green);
                });
                break;
            case '.js':
            case '.coffee':
                console.log('\nunlink script!'.red);
                fs.unlink(file.replace('src', 'dist'));
                gulp.start('script', function(err) {
                    if (err) throw err;
                    console.log('√ script reloaded!\n'.green);
                });
                break;
            case '.dot':
                console.log('\nnunlink dot template!'.yellow);
                gulp.start('script', function(err) {
                    if (err) throw err;
                    console.log('√ script reloaded!\n'.green);
                });
                break;
            default:
                break;
        }
    });
});

/*
 * default tasks
 *
 * @include: script
 * @include: style
 * @include: image
 * @include: watch
 *
 */
gulp.task('default', ['watch', 'script', 'style', 'image']);

/*
 * product tasks
 *
 * @include: script
 * @include: style
 * @include: image
 *
 */
gulp.task('build', ['script', 'style', 'image']);
