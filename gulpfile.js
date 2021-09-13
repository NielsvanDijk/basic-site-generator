var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));

function buildStyles() {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: "compressed", // compressed || nested || expanded
        precision: 10,
      }).on("error", sass.logError)
    )
    .pipe(gulp.dest("./css"));
}

exports.buildStyles = buildStyles;

exports.watch = function () {
  gulp.watch("./src/scss/*.scss", buildStyles);
};
