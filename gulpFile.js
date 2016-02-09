var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    del = require('del'),

    sassInput = './assets/styles/**/*.scss',
    jsInput = './assets/scripts/**/*.js',
    output = './dist',

    babelOptions = {
        presets: ['es2015']
    },
    sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded'
    },
    autoprefixerOptions = {
        browsers: ['last 2 versions'],
        cascade: false
    };


gulp.task('clean', () => {
    return del([output]);
});

gulp.task('js', ['clean'], () => {
    return gulp.src(jsInput)
        .pipe(sourcemaps.init())
        .pipe(babel(babelOptions))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(output+'/js'));
});

gulp.task('sass', ['clean'], () => {
    return gulp.src(sassInput)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(output+'/css'));
});

gulp.task('default', ['clean', 'js', 'sass']);

gulp.task('watch', () => {
    gulp.watch(sassInput, ['sass'])
        .on('change', onWatch);

    gulp.watch(jsInput, ['js'])
        .on('change', onWatch);
});

gulp.task('prod', () => {
    return gulp
        .src(sassInput)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(output));
});

function onWatch(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}