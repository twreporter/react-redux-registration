/* eslint-disable */
var gulp = require("gulp");
var babel = require("gulp-babel");
var rename = require("gulp-rename");
var path = require('path')

var theBase = { base: './src' }
var dest = 'lib'

function transpile() {
  return gulp.src('./src/**/*', theBase)
    .pipe(babel())
    .pipe(gulp.dest(dest))
}

// copy lib to node_modules under twreporter-react
function teleport() {
  let customerFolder = process.env.CUSTOMER_FOLDER
  if (typeof customerFolder !== 'string') {
    customerFolder = path.resolve(__dirname + '/../twreporter-react')
  }
  return gulp
    .src('./lib/**/*')
    .pipe(gulp.dest(customerFolder+'/node_modules/twreporter-registration/lib'))
}

gulp.task('build', transpile)

gulp.task('dev', gulp.series(transpile, teleport, () => {
  const watcher = gulp.watch(['src/**'], gulp.series('build', teleport))
  watcher.on('change', (filePath) => {
    console.log(`File ${filePath} was changed, running tasks...`)
  })
}))
