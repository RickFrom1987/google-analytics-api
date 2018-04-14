// Require node modules
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    paths = {
      'sass': './src/sass/',
      'css': './build/css/',
      'scripts': './src/scripts/',
      'js': './build/js/',
      'site': './build/'
    },
    fs = require('fs'),
    s3 = require('gulp-s3-publish');

// Sass task: Compile SCSS files to CSS
gulp.task('sass', function () {
  return gulp.src(paths.sass + '*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({ stream: true })); // Reload browser
});


// Browser sync task: to launch a server and auto-reload
gulp.task('browser-sync', ['sass', 'scripts'], function () {
  browserSync({ server: {
      baseDir: paths.site
    }});
});


// Scripts task
gulp.task('scripts', function () {
  // return gulp.src([paths.scripts + 'index.js'])
  return gulp.src(paths.scripts + '*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest(paths.js))
    .pipe(browserSync.reload({ stream: true })); // Reload browser
});

// Reload browser
gulp.task('reload', function () {
  browserSync.reload();
});


// Watch task: watch for file changes and
// trigger appropriate task.
gulp.task('watch', function () {
  gulp.watch(paths.sass + '**/*.scss', ['sass']); // Watch sass files
  gulp.watch(paths.scripts + '**/*.js', ['scripts']); // Watch .js files
  gulp.watch(paths.site + '**/*.html', ['reload']); // Watch html files
});


// Deploy to s3
gulp.task('deploy', function () {
  var aws = JSON.parse(fs.readFileSync('./aws.json'));
  return gulp.src('./build/**/*')
    .pipe(s3(aws));
});


// Default task: Run `gulp` to launch browser-sync
//and watch for file changes.
gulp.task('default', ['browser-sync', 'watch']);
