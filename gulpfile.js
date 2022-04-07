// gulpプラグインの読み込み
var gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var cssdeclsort = require("css-declaration-sorter");

// scssの監視タスクを作成する
gulp.task("default", function () {
  // scssファイルを監視
  return gulp.watch("sass/*.scss", function () {
    // scssの更新があった場合の処理
    // scssファイルを取得
    return (
      gulp
        .src("sass/*.scss")
        // Sassのコンパイルを実行
        .pipe(
          sass({
            outputStyle: "expanded",
          })
            // Sassのコンパイルエラーを表示
            // (これがないと自動的に止まってしまう)
            .on("error", sass.logError)
        )
        // sassの後に指定
        .pipe(postcss([cssdeclsort({ order: "smacss" })]))
        .pipe(postcss([autoprefixer()]))
        .pipe(postcss([mqpacker()]))
        // cssフォルダー以下に保存
        .pipe(gulp.dest("css"))
    );
  });
});