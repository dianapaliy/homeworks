var gulp         = require ('gulp'),
    browserSync  = require('browser-sync').create(), 
    less         = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    watch        = require('gulp-watch'),
    plumber      = require('gulp-plumber'),
    uglify       = require('gulp-uglify'),
    notify       = require('gulp-notify'),
    imagemin     = require('gulp-imagemin'),
    minifyCSS   = require('gulp-minify-css'),
    obfuscate   = require('gulp-obfuscate'),
    sourcemaps = require('gulp-sourcemaps'),
    eslint = require('gulp-eslint'),
    reload       = browserSync.reload;
    env = process.env.NODE_ENV;

var paths = {
    scripts: './src/js/*.js',
    styles: './src/less/*.less',
    builtStyles: './build/css',
    builtJs: './build/js'
};

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(minifyCSS())
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.builtStyles))
        .pipe(notify({ message: 'CSS task complete' }));
});

gulp.task('autoprefixer', function () {
    return gulp.src('build/all.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(paths.builtStyles));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.builtJs))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('copy', function () {
    gulp.src(['./src/index.html', './src/products.json'])
        .pipe(gulp.dest('./build'));
});

gulp.task('images', function() {
    return gulp.src('./src/img/*')
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest('build/images-min'))
        .pipe(notify({ message: 'Image task complete' }));
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('src/*.html', reload);
    gulp.watch('src/less/*', ['styles']);
    gulp.watch('src/js/*', ['scripts']);
    gulp.watch('src/images/*', ['images']);
});

gulp.task('browser-sync', function() {
    browserSync.init(['src/css/*', 'src/js/*'], {
        server: {
            baseDir: ["src"]
        }
    });
});

gulp.task('lint', function() {
    return gulp.src(['src/js/*.js','src/less/*.less', '!node_modules/**'])
        .pipe(eslint())
});

gulp.task('default', ['styles', 'autoprefixer', 'browser-sync', 'scripts', 'watch', 'copy', 'images', 'lint']);