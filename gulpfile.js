var gulp = require('gulp');

// gulp plugins to use for tasks
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

// *** individual gulp tasks ***

//run jshint to find any JS issues
gulp.task('jshint', function(){
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

//take all the white space out of CSS file
gulp.task('minify-css', function(){
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build/'));
});

//take all the white space out of all the js files
gulp.task('minify-js', function(){
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(gulp.dest('./build/'));
});

gulp.task('images', () => {
  return gulp.src('./app/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./build/'));
});


//copy the html files and put them in the build folder
gulp.task('copy-html-files', function(){
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build/'));
});

//copy dependencies from bower_components folder and put them in the build folder
gulp.task('copy-bower-components', function(){
  gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('build/bower_components'));
});

//start up the web server!
gulp.task('connect', function(){
  connect.server({
    root: 'app/',
    port: 8080
  });
});

//watch for changes to files
// Watch task
gulp.task('watch', function() {
  gulp.watch('./app/js/*.js', ['jshint']);
  gulp.watch('./app/css/*.css', ['minify-css']);
});

// default task
gulp.task('default',
  ['jshint', 'connect', 'watch']
);

// build task
gulp.task('build',
  ['jshint', 'minify-css', 'images', 'minify-js', 'copy-html-files', 'copy-bower-components', 'connect']
);