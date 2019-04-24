/**
 * gulp
 * @description the main gulp file
 * @version v1
 */
'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import fancyLog from 'fancylog';
import webpack from 'webpack-stream'
import path from 'path'

const $ = gulpLoadPlugins();

const paths = require('./variables')

/**
 * scripts
 * @description pipes our vendor JS files, main JS file out and minifies it
 * @version v1
 */
gulp.task('scripts', function () {
  fancyLog.info('Building JS File..');
  return gulp.src(path.resolve(__dirname, paths.js.entryFile))
    .on('error', function(err) {
      fancyLog.error('Error: ' + err);
      this.emit('end');
    })
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest(paths.js.outputJSFileLocation))
    .pipe(browserSync.reload({ stream: true }));
});

/**
 * sass
 * @description compiles our static .scss files into one main .css file
 * @version v1
 */
gulp.task('styles', function () {
  fancyLog.info('Compiling: ' + paths.css.mainSassFile);
  return gulp.src(paths.css.mainSassFile)
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: ['scss'],
      outputStyle: 'expanded',
      onError: browserSync.notify
    }).on('error', $.sass.logError))
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.autoprefixer())
    .pipe($.plumber())
    .pipe($.concat(paths.css.outputCSSFile)) // output main CSS file without cleanCSS
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.css.outputCSSFileLocation))
    .pipe(browserSync.reload({ stream: true }));
});

/**
 * browser-sync
 * @description generates BrowserSync for watching and refreshing page
 * @version v1
 */
gulp.task('browser-sync', ['scripts', 'styles'], function () {
  fancyLog.info('Starting Browser Sync Server at: ' + paths.siteURL);
  browserSync.init({
    proxy: paths.siteURL,
    files: [
      '../templates/*.twig',
      '../templates/**/*.twig',
      paths.js.outputJSFileLocation + '/*.js',
      paths.css.outputCSSFileLocation + '/*.css'
    ]
  });
});

/**
 * @function imgs
 * @description compresses static images
 * @version v1
 */
gulp.task('imgs', function () {
  fancyLog.info('Compressing Images in: ' + paths.media.imgs);
  gulp.src(paths.media.imgs + '/**/*.{gif,jpg,png,svg,ico}')
    .pipe($.imagemin())
    .pipe($.size({gzip: true, showFiles: true}))
    .pipe(gulp.dest(paths.media.imgsCompressed));
});

/**
 * svgs
 * @description generates and creates svg icons using #symbol
 * @version v1
 */
gulp.task('svgs', function () {
  fancyLog.info('Generating icons.svg at: ' + paths.media.icons);
  return gulp.src(paths.media.icons + '/*.svg')
    .pipe($.svgmin())
    .pipe($.svgstore())
    .pipe($.size({gzip: true, showFiles: true}))
    .pipe(gulp.dest(paths.media.iconsCompressed));
});

/**
 * watch
 * @description watchs the .js and .scss files for changes
 * @version v1
 */
gulp.task('watch', function () {
  fancyLog.info('Watching Scss and JS files');
  gulp.watch(paths.js.jsFiles, ['scripts']);
  gulp.watch(paths.css.sassFiles, ['styles']);
});

/**
 * Build JS
 * @description Minify and conat JS Files
 */
gulp.task('build:js', function() {
  fancyLog.info('Building JS File..');
  return gulp.src(path.resolve(__dirname, paths.js.entryFile))
    .on('error', function(err) {
      fancyLog.error('Error: ' + err);
      this.emit('end');
    })
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest(paths.js.outputJSFileLocation))
    .pipe($.size({gzip: true, showFiles: true}));
});

/**
 * Build CSS
 * @description Minify and conat Scss Files into one CSS File
 */
gulp.task('build:css', function() {
  fancyLog.info('Building: ' + paths.css.mainSassFile);
  return gulp.src(paths.css.mainSassFile)
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: ['scss'],
      outputStyle: 'expanded',
      onError: browserSync.notify
    }).on('error', $.sass.logError))
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.autoprefixer())
    .pipe($.plumber())
    .pipe($.cleanCss())
    .pipe($.concat(paths.css.outputCSSFileCompressed)) // output main CSS file without cleanCSS
    .pipe(gulp.dest(paths.css.outputCSSFileLocation))
    .pipe($.size({gzip: true, showFiles: true}))
})

/**
 * build
 * @description minifies assets
 * @version v1
 */
gulp.task('build', ['build:js', 'build:css']);

/**
 * default
 * @description runs the default task, which is browser sync and watch tasks
 * @version v1
 */
gulp.task('default', ['browser-sync', 'watch']);