var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var del = require("del");
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var html2js = require('gulp-html2js');

//Future Use
//-------------
//var watch = require('gulp-watch');
//var plumber = require('gulp-plumber');

/////////////////////////////////////////////////

gulp.task('clean', function() {
    return del(['public/dist']);
});

gulp.task('compile:html', ['clean'], function() {
    return gulp.src('app/**/**.html')
        .pipe(html2js({
            rename: function(moduleName) {
                return moduleName.replace('../', '').replace(/^(app\/|public\/)(node_modules\/)?/, '');
            },
            outputModuleName: 'app.viewTemplates',
            htmlmin: {
                collapseWhitespace: true, // Collapse white space that contributes to text nodes in a document tree.
                conservativeCollapse: true, // Always collapse to 1 space (never remove it entirely).
                removeRedundantAttributes: true, // Remove attributes when value matches default.
                removeComments: true
            },
            singleModule: true
        }))
        .pipe(concat('view-template.js'))
        .pipe(gulp.dest('public/dist'))
        .on('error', gutil.log);
});

gulp.task('compile:js', ['compile:html'], function() {
    return gulp.src('app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(babel())
        .pipe(concat('application.js'))
        .pipe(gulp.dest('public/dist'))
        .pipe(size({title: 'application.js'}))
        .pipe(uglify({
            screwIE8: true
        })).on('error', gutil.log)
        .pipe(rename('application.min.js'))
        .pipe(size({title: 'application.min.js'}))
        .pipe(size({title: 'application.min.js', gzip: true}))
        .pipe(sourcemaps.write('.', {sourceRoot: '/'}))
        .pipe(gulp.dest('public/dist'))
        .on('error', gutil.log);
});

gulp.task("default", ['compile:js']);
