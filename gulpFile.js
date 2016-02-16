var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    del = require('del'),

    webpack = require('webpack-stream'),

    sassInput = './assets/styles/**/*.scss',
    jsInput = './assets/scripts/**/*.js',
    output = './dist',

    babelOptions = {
        presets: ['es2015']
    },
    webpackOptions = {
        output: {
            filename: 'bundle.js'
        },
        devtool: 'source-map',
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    include: '/assets/scripts',
                    loader: 'babel-loader',
                    exclude: /(node_modules|bower_components)/
                }
            ]
        },
        debug: true
    },
    sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded'
    },
    autoprefixerOptions = {
        browsers: ['last 2 versions'],
        cascade: false
    };


gulp.task('clean:css', () => {
    return del([output+'/css']);
});

gulp.task('clean:js', () => {
    return del([output+'/js']);
});


gulp.task('babel:js', ['clean:js'], () => {
    return gulp.src(jsInput)
        .pipe(sourcemaps.init())
        .pipe(babel(babelOptions))

        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(output+'/js'));
});

gulp.task('bundle:js', ['babel:js'], () => {
    return gulp.src('dist/js/main.js')
        .pipe(webpack(webpackOptions))
        .pipe(gulp.dest('dist/js'));
});


gulp.task('sass', ['clean:css'], () => {
    return gulp.src(sassInput)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(output+'/css'));
});


gulp.task('clean', ['clean:css', 'clean:js']);
gulp.task('js', ['babel:js', 'bundle:js']);
gulp.task('default', ['clean', 'js', 'sass']);


gulp.task('watch', () => {
    gulp.watch(sassInput, ['sass'])
        .on('change', onWatch);

    gulp.watch(jsInput, ['js'])
        .on('change', onWatch);
});

gulp.task('prod', () => {
    return gulp.src(sassInput)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(output));
});

var onWatch = event => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
};