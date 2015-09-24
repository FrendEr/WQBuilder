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
 *
 */
var webpack = require('webpack');
var find = require('find');
var uglify = require('gulp-uglify');
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
var keywordMap = ['index', 'list', 'detail'/*, 'channel', 'order', 'pay', 'album', 'activity', 'about'*/];

gulp.task('script', function() {
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
            var chunks = keywordArrMap[keywordMap[i]],
                ccpObj = new CommonsChunkPlugin({
                name: keywordMap[i] + '.base',
                filename: 'pages/' + keywordMap[i] + '/' + keywordMap[i] + '.base.js',
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

        webpack({
            entry: entry,
            output: {
                path: path.join(__dirname, 'assets/dist/js'),
                filename: '[name].js'
            },
            plugins: plugins
        }, function(err, stats) {
            if (err) console.log('webpack error!'.red);
        });
    }).error(function(err) {
        console.log('find js files error!'.red);
    });
});

gulp.task('script-uglify', function() {
    return gulp.start('script', function(err) {
        if (err) console.log('gulp script error!'.red);

        return gulp.src('assets/dist/**/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('assets/dist'));
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
                    console.log('√ image reloaded!\n'.green);
                });
                break;
            case '.css':
            case '.less':
                console.log('\nadd style!'.yellow);
                gulp.start('style', function(err) {
                    console.log('√ style reloaded!\n'.green);
                });
                break;
            case '.js':
            case '.coffee':
                console.log('\nadd script!'.yellow);
                gulp.start('script', function(err) {
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
                    console.log('√ image reloaded!\n'.green);
                });
                break;
            case '.css':
            case '.less':
                console.log('\nstyle change!'.yellow);
                gulp.start('style', function(err) {
                    console.log('√ style reloaded!\n'.green);
                });
                break;
            case '.js':
            case '.coffee':
                console.log('\nscript change!'.yellow);
                gulp.start('script', function(err) {
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
                    console.log('√ image reloaded!\n'.green);
                });
                break;
            case '.css':
            case '.less':
                console.log('\nunlink style!'.red);
                fs.unlink(file.replace('src', 'dist'));
                gulp.start('style', function(err) {
                    console.log('√ style reloaded!\n'.green);
                });
                break;
            case '.js':
            case '.coffee':
                console.log('\nunlink script!'.red);
                fs.unlink(file.replace('src', 'dist'));
                gulp.start('script', function(err) {
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
gulp.task('default', ['script', 'style', 'image', 'watch']);

/*
 * product tasks
 *
 * @include: script
 * @include: style
 * @include: image
 *
 */
gulp.task('prod', ['script-uglify', 'style', 'image']);
