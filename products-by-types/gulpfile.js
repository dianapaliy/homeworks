var gulp         = require ('gulp'),
    browserSync  = require('browser-sync').create(), 
    less         = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    watch        = require('gulp-watch'),
    plumber      = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    env = process.env.NODE_ENV;

var paths = {
    scripts: './src/*.js',
    styles: './src/*.less',
    builtStyles: './build/css',
    builtJs: './build/js'
};

gulp.task('less', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(uglify())
        .pipe(plumber())
        .pipe(concat('all.css'))
        .pipe(gulp.dest(paths.builtStyles));
});

gulp.task('autoprefixer', function () {
    return gulp.src('build/all.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(paths.builtStyles));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.builtJs));
});

gulp.task('watch', function () {
    return watch('build/css/*.css')
        .pipe(gulp.dest('./build'));
});

gulp.task('copy-html', function () {
    return src('src/*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('default', ['less'], ['autoprefixer'], ['browser-sync'], ['scripts'], ['watch'], ['copy-html']);