var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
// var sourcemaps = require('gulp-sourcemaps')
// var uglify = require('gulp-uglify')
// var ngAnnotate = require('gulp-ng-annotate')
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./www/styles/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./www/styles/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/assets/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/assets/css/'))
    .on('end', done);
});

// gulp.task('js', function () {
//   gulp.src(['src/**/module.js', 'src/**/*.js'])
//     .pipe(sourcemaps.init())
//       .pipe(concat('app.js'))
//       .pipe(ngAnnotate())
//       .pipe(uglify())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('.'))
// })

gulp.task('watch', ['js'], function () {
  gulp.watch('src/**/*.js', ['js'])
})

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
