/**
    Configuration.
    Project Configuration for gulp tasks.
*/

const path = require('path');
const sassFiles             = 'assets/scss/style.scss';
const styleDestination      = 'dist/style';

/**
    Load Plugins.
    Load gulp plugins and assing them semantic names.
 */

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const gutil      = require('gulp-util');
const chalk      = require('chalk');
// const minifycss  = require('gulp-minify-css');

// CSS related plugins.
var sass         = require('gulp-sass'); // Gulp pluign for Sass compilation
var autoprefixer = require('gulp-autoprefixer'); // Autoprefixing magic
var minifycss    = require('gulp-uglifycss'); // Minifies CSS files

// JS related plugins.
var concat       = require('gulp-concat'); // Concatenates JS files
var uglify       = require('gulp-uglify'); // Minifies JS files

// Utility related plugins.
var rename       = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
var sourcemaps   = require('gulp-sourcemaps'); // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css)
var notify       = require('gulp-notify'); // Sends message notification to you

/**
    Task: styles
    Compiles Sass, Autoprefixes it and Minifies CSS
*/

gulp.task('styles', function(){
    gulp.src( sassFiles )
        .pipe(sourcemaps.init())
        .pipe( sass({
            errLogToConsole: true,
            outputStyle: 'expanded', // compressed || nested || expanded
            precision: 10
        }))
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: false}))
        .pipe( autoprefixer(
			'last 2 version',
			'> 1%',
			'safari 5',
			'ie 8',
			'ie 9',
			'opera 12.1',
			'ios 6',
			'android 4'))
        .pipe(sourcemaps.write (styleDestination))
        .pipe(rename( { suffix: '.min' } ) )
		.pipe( gulp.dest( styleDestination ) )
		.pipe(notify( { message: 'TASK Completed!', onLast: true }))
});

/**
    Task: browser-sync
    Refreshes the browser for you
*/

gulp.task('browser-sync', function(){
    const files = [
        '**/*.php',
        '**/*.html'
    ];

    browserSync.init(files, {
        server: "./",
        port: 3000,
    })
});

gulp.task('watch', function(){
    gulp.watch('./dist/styles/*.css', ['styles']);
    gulp.watch("./assets/scss/**/*.scss", ['styles']);
    gulp.watch('./dist/style/*.css').on('change', browserSync.reload);
});

/**
    Task: styles
    Compiles Sass, Autoprefixes it and Minifies CSS
*/

gulp.task('default', ['styles', 'browser-sync', 'watch']);
