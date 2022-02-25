/* eslint-disable */
// dependencies
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const watchify = require("watchify");
const browserSync = require("browser-sync").create();
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const notifier = require('node-notifier');
// const cssmin = require("gulp-cssnano");
// Dec 2019: "gulp-cssnano" has not been updated for two years and is lightly used compared to gulp-clean-css -- not worth migrating since
// gulp is not used for production bundles, so it doesn't matter if css is minified.
const del = require("del");
const server = require("./server");

const PRODUCTION = process.env.NODE_ENV === "production";

gulp.task("browserify", function () {
  const ops = {
    debug: !PRODUCTION,
    entries: "js/index.js",
    cache: {},
    packageCache: {},
    extensions: [".js", ".jsx"],
    basedir: "./src",
    transform: [babelify],
  };
  // const ops = {
  //   debug: !PRODUCTION,
  //   entries: "js/startReactReadyApp.js",
  //   cache: {},
  //   packageCache: {},
  //   extensions: [".js", ".jsx"],
  //   basedir: "./src",
  //   transform: [babelify],
  // };

  // 2017-04-05 Watchify is causing too many problems, so we are turning it off until we can resolve Issue 757
  // var opsWatchify = assign({ cache: {}, packageCache: {} }, watchify.args, ops);
  // var browserifyWithWatchify = watchify(browserify(opsWatchify));

  function err (e) {
    console.error(e.stack);
    notifier.notify({ title: "Compile Error", message: e.stack });
    this.emit("end");
  }

  const bundler = browserify(ops);

  const bundle = function () {
    return PRODUCTION ?

    // production build with minification
    bundler
      .transform('uglifyify', { global: true })
      .bundle()
      .on("error", err)
      .pipe(source("bundle.js"))
      .pipe(buffer())
      .pipe(uglify({ preserveComments: false, mangle: false }))
      .pipe(gulp.dest("./build/js")) :

    // development build
    bundler
      .plugin('watchify', {
        verbose: true,
      })
      .bundle()
      .on("error", err)
      .on("update", bundle)
      .pipe(source("bundle.js"))
      .pipe(gulp.dest("./build/js"))
      .pipe(browserSync.stream());

    // Compressed development build - didn't work
    // bundler
    //   .plugin('watchify', {
    //     verbose: true,
    //   })
    //   .transform('uglifyify', { global: true })
    //   .bundle()
    //   .on("error", err)
    //   .on("update", bundle)
    //   .pipe(source("bundle.js"))
    //   .pipe(buffer())
    //   .pipe(uglify({ preserveComments: false, mangle: false }))
    //   .pipe(gulp.dest("./build/js"))
    //   .pipe(browserSync.stream());


  }
  return bundle();
});

// Run server
gulp.task("server", PRODUCTION ? () => server(PRODUCTION) : function () {
  server();

  // only start browserSync when this is development
  browserSync.init({
    proxy: "localhost:3003",
    open: false,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: true,
    },
    logPrefix: `${new Date().toString().split(" ")[4]} - We Vote USA`,
  });
});

// Clean out Build directory
gulp.task("clean:build", function (done) {
  return del(["./build/**"], done);
});

// Copy Index page to Build directory
gulp.task("copy-index", function (done) {
  gulp.src("./src/*.html")
    .pipe(gulp.dest("./build"))
    .pipe(browserSync.stream());
  done();
});

// Copy image files to Build directory
gulp.task("copy-img", function () {
  return gulp.src("./src/img/**/*")
    .pipe(gulp.dest("./build/img"))
    .pipe(browserSync.stream());
});

// Copy javascript files to Build directory
gulp.task("copy-javascript", function () {
  return gulp.src("./src/javascript/*")
    .pipe(gulp.dest("./build/javascript"))
    .pipe(browserSync.stream());
});

// Build tasks
gulp.task("build", gulp.series("copy-index", "copy-img", "copy-javascript", "browserify"));

// Watch tasks
gulp.task("watch", PRODUCTION ? ()=> {} : function (done) {
  gulp.watch("./src/index.html", gulp.parallel("copy-index")).on("change", function (path) {
    console.log("Watcher: " + path + " was changed.");
    done();
  });

  gulp.watch("./src/img/**/*", gulp.parallel("copy-img")).on("change", function (path) {
    console.log("Watcher: " + path + " was changed.");
    done();
  });

  gulp.watch("./src/javascript/*.js", gulp.parallel("copy-javascript")).on("change", function (path) {
    console.log("Watcher: " + path + " was changed.");
    done();
  });

  gulp.watch("./src/js/**/*.js?(x)", gulp.parallel("browserify")).on("change", function (path) {
    console.log("Watcher: " + path + " was changed.");
    done();
  });

  done();
});

// Default
gulp.task("default", gulp.series(
  "clean:build",
  "build",
  "watch",
  "server"
));
