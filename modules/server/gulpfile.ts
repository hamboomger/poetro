import gulp, { src, dest } from 'gulp';
import ts from 'gulp-typescript';
import nodemon from 'gulp-nodemon';

const compileTs = ts.createProject('tsconfig.json');

function build() {
  return src('src/**/*.ts')
    .pipe(compileTs())
    .pipe(dest('dist'));
}

function watch(cb: () => void) {
  gulp.watch('src/**/*.ts', build);
  cb();
}

function runDev(cb: () => void) {
  nodemon({
    script: 'dist/index.js',
    ext: 'js, json',
    env: { NODE_ENV: 'development' },
    done: cb,
  });
}

export const serveDev = gulp.series(build, watch, runDev);
