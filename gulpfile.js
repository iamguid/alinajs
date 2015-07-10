var fs = require('fs');
var path = require('path');
var gulp = require('gulp');

// Load all gulp plugins automatically
// and attach them to the `plugins` object
var plugins = require('gulp-load-plugins')();

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var node_config = require('./package.json');
var bower_config = require('./bower.json');
var project = require('./project.json');

var config = project['configs'];
var dirs = config.directories;
var sources = (function () {
  var src = [];
  for (var i = 0, ii = config.files.length; i < ii; i++) {
    src.push(dirs.src + '/' + config.files[i])
  }
  return src;
})();


// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

gulp.task('clean', function (done) {
  require('del')([
    dirs.dist
  ], done);
});


gulp.task('precompile', function () {
  return gulp.src(sources.concat([
      '!' + dirs.src + '/amd-banner.js',
      '!' + dirs.src + '/amd-footer.js'
    ]))
    .pipe(plugins.jscs());
});


gulp.task('postcompile', function () {
  var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');

    return gulp.src(sources)
      .pipe(plugins.concat('alina.js'))
      .pipe(plugins.header(banner, { pkg: project }))
      .pipe(gulp.dest(dirs.dist))
      .pipe(plugins.uglify())
      .pipe(plugins.header(banner, { pkg: project }))
      .pipe(plugins.rename('alina.min.js'))
      .pipe(gulp.dest(dirs.dist));
});


// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task('build', function (done) {
    runSequence(
      ['precompile', 'clean'],
      ['postcompile'],
    done);
});

gulp.task('default', ['build']);
