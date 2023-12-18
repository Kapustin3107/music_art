import browserSync from "browser-sync";
import del from "del";
import gcmq from "gulp-group-css-media-queries";
import gulp from "gulp";
import plugin from "gulp-load-plugins";

const sass = require("gulp-sass")(require("sass"));

const {
  shorthand,
  imagemin,
  plumber,
  notify,
  svgo,
  csscomb,
} = plugin();

const { series, parallel, watch, task, dest, src } = gulp;

const filePaths = {
  source: "./source",
  build: "./build",
};

const { source, build } = filePaths;

browserSync.create();
task("serve", () => {
  return browserSync.init({
    server: `${source}/`,
    localOnly: true,
    ui: false,
    external: false,
  });
});

task("scss", () => {
  return src(`${source}/scss/**/*.scss`)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sass().on("error", (error) => showError(error)))
    .pipe(shorthand())
    .pipe(gcmq())
    .pipe(plumber.stop())
    .pipe(dest(`${source}/css`))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

/* Watch task */
task("watch", () => {
  watch(`${source}/scss/**/*.scss`, series("scss"));
  watch(`${source}/**/*.html`).on('change', browserSync.reload);
});

/* Default task: gulp */
task("default", series("scss", parallel("watch", "serve")));

/* Build task: build */
task("clean", () => del(`${build}/**`, { force: true }));

// To do in build:
// - add minifed css,js
// - create svg sprite
// - add grid

task("copyToBuild", (done) => {
  src(
    [
      `${source}/fonts/*.{woff2,woff}`,
      `${source}/js/**/*.js`,
      `${source}/**/*.html`,
    ],
    {
      base: "source",
    }
  ).pipe(dest(build));
  done();
});

task("optimizeSVG", () => {
  return src(`${source}/img/**/*.svg`)
    .pipe(svgo())
    .pipe(dest(`${build}/img`));
});

/* Images task */
task("optimizeImages", () => {
  return src(`${source}/img/**/*.{png,jpg,gif,svg,webp}`)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 90, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo(),
      ])
    )
    .pipe(dest(`${build}/img`));
});

task("optimizeCSS", () => {
  return src(`${source}/scss/**/*.scss`)
    .pipe(sass().on("error", (error) => showError(error)))
    .pipe(shorthand())
    .pipe(gcmq())
    //.pipe(csscomb())
    .pipe(dest(`${build}/css`));
});

task(
  "build",
  series("clean", "copyToBuild", parallel("optimizeImages", "optimizeCSS"))
);

/* Error  */
function showError(error) {
  console.log(error);
}
