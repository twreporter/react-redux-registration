var gulp = require("gulp");
var babel = require("gulp-babel");
var rename = require("gulp-rename");

var paths = {
  root: './src/**/*.js',
  containers: './src/containers/*.js',
  components: './src/components/*.js',
  reducers: './src/reducers/**/*.js',
  actions:  './src/actions/**/*.js',
  utils: './src/utils/*.js'
};

var theBase = { base: 'src' };


gulp.task('index', (event) => {
  return gulp.src('./index_dev.js')
      .pipe(babel({
          presets: ['es2017']
      }))
      .pipe(rename('index.js'))
      .pipe(gulp.dest('.'));
});

gulp.task('root', () => {
    return gulp.src(paths.root, theBase)
        .pipe(babel({
            presets: ['es2017']
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('components', () => {
    return gulp.src(paths.components, theBase)
        .pipe(babel({
            presets: ['es2017']
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('containers', () => {
    return gulp.src(paths.containers, theBase)
        .pipe(babel({
            presets: ['es2017']
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('reducers', () => {
    return gulp.src(paths.reducers, theBase)
        .pipe(babel({
            presets: ['es2017']
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('actions', () => {
    return gulp.src(paths.actions, theBase)
        .pipe(babel({
            presets: ['es2017']
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('utils', () => {
    return gulp.src(paths.utils, theBase)
        .pipe(babel({
            presets: ['es2017']
        }))
        .pipe(gulp.dest('lib'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('./index_dev.js', ['index']);
  // gulp.watch(paths.root, ['root']);
  gulp.watch(paths.components, ['components']);
  gulp.watch(paths.containers, ['containers']);
  gulp.watch(paths.reducers, ['reducers']);
  gulp.watch(paths.actions, ['actions']);
  gulp.watch(paths.actions, ['utils']);
});

gulp.task('default', ['watch', 'index', 'components', 'containers', 'reducers', 'actions', 'utils']);
