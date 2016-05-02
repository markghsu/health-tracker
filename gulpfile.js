var gulp = require('gulp'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cleancss = require('gulp-clean-css'),
	minhtml = require('gulp-htmlmin'),
	lint = require('gulp-eslint'),
	uglify = require('gulp-uglify'),
	replace = require('gulp-replace'),
	merge = require('merge-stream'),
	sourcemaps = require('gulp-sourcemaps');
var jsfiles = ['src/js/lib/date.js','src/js/models/food.js','src/js/collections/availfoods.js','src/js/collections/foodslist.js','src/js/views/*','src/js/routers/router.js','src/js/app.js'];

gulp.task('process-html', function() {
	return gulp.src('src/*.html')
		.pipe(replace('main.js','main.min.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('process-scripts', function() {
	return gulp.src(jsfiles)
		.pipe(sourcemaps.init())
		.pipe(lint())
		.pipe(lint.format())
		.pipe(lint.failAfterError())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('src/js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('process-styles', function() {
	return gulp.src('src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
				cascade: false
		}))
		.pipe(gulp.dest('src/css'))
		.pipe(cleancss())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function(){
	gulp.watch(jsfiles,['process-scripts']);
	gulp.watch('src/*.html',['process-html']);
	gulp.watch('src/sass/*.scss',['process-styles']);
});

gulp.task('default', ['process-scripts','process-html','process-styles','watch'], function() {});