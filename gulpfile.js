const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const csso = require('gulp-csso');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const cssConcat = require('gulp-concat-css');
const rename = require("gulp-rename");


const jsDefault = () => {
    return gulp.src([
        './src/js/data.js',
        './src/js/Item.js',
        './src/js/Comments.js',
        './src/js/Order.js',
        './src/js/modalFunc.js',
        './src/js/commonFunc.js',
        './src/js/homepage/functions.js',
        './src/js/homepage/main.js',
        './src/js/category/functions.js',
        './src/js/category/main.js',
        './src/js/cart/functions.js',
        './src/js/cart/main.js',
        './src/js/product_card/function.js',
        './src/js/product_card/main.js',
        './src/js/app.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(babel({
            "presets": ["@babel/preset-env"],
            "plugins": [
                "@babel/plugin-proposal-class-properties",
            ]
        }))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/js'));
};

const cssDefault = () => {
    return gulp.src([
        './src/css/normalize.css',
        './src/css/style.css',
        './src/css/fontawesome-stars.css',
        './src/css/homepage/homepage.css',
        './src/css/category/category.css',
        './src/css/product_card/product_card.css',
        './src/css/cart/cart.css',
    ])
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(cssConcat("style.css"))
        .pipe(csso())
        .pipe(rename("style.min.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'));
};

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('clean', () => {
    return del('./build');
});

gulp.task('clean-html-json', () => {
    return (del(['./build/index.html', './build/data.json']))
})

gulp.task('move', () => {
    return gulp.src([
        './src/*.html',
        './src/data.json',
    ])
        .pipe(gulp.dest('./build'));
});

gulp.task('images', () => {
    return gulp.src('./src/img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));
});

gulp.task('fonts', () => {
    return gulp.src('./src/fonts/*.*')
        .pipe(gulp.dest('./build/fonts'));
});

gulp.task('compile', gulp.series('sass', cssDefault, 'images', 'fonts', jsDefault, 'move'));

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./build",
            routes: {
                "/node_modules": "node_modules"
            }
        },
        watch: true
    });
    watch(['./src/index.html', './src/data.json'], gulp.series('clean-html-json', 'move'));
    watch('./src/sass/**/*.scss', gulp.series('sass', cssDefault));
    watch('./src/js/**/*.js', jsDefault);
    watch('./src/img/**/*.*', 'images');
    watch('./src/fonts/*.*', 'fonts');
});

gulp.task('start', gulp.series('clean', 'compile', 'server'));