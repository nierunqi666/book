var gulp = require('gulp');
var server = require('gulp-webserver');
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var css = require('gulp-clean-css');
var sequence = require('gulp-sequence');
var mock = require('./src/mock');
//css
gulp.task('css', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >=4.0']
        }))
        .pipe(css())
        .pipe(gulp.dest('./src/css'))
});

//监听
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['css'])
})

gulp.task('default', function(cb) {
    sequence('css', 'watch', 'server', cb)
});

//起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
            host: '169.254.85.122',
            middleware: function(req, res, next) {
                if (/\/api/g.test(req.url)) {
                    var url = decodeURI(req.url);
                    console.log(url);
                    var data = mock(url);
                    res.end(JSON.stringify(data));
                }
                next()
            }

        }))
})