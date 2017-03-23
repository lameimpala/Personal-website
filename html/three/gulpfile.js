/* eslint-env node */
(function() {
	'use strict';

	const babel = require('gulp-babel');
	
	var addStream = require('add-stream');
	var angularTemplateCache = require('gulp-angular-templatecache');
	var concat = require('gulp-concat');
	var gulp = require('gulp');
	var uglify = require('gulp-uglify');
	var cleanCSS = require('gulp-clean-css');
	var minifyHTML = require('gulp-minify-html');
	var ngAnnotate = require('gulp-ng-annotate');
	var watch = require('gulp-watch');
	var batch = require('gulp-batch');
	var THREE = require('three');

	gulp.task('default', ['build-js', 'build-css', 'build-template-js', 'copy-fonts']);
	
	gulp.task('copy-fonts', function() {
		return gulp
			.src('app/fonts/*')
			.pipe(gulp.dest('build/fonts'));
	});
	
	gulp.task('build-css', function() {
		return gulp
			.src('app/css/*.css')
			.pipe(cleanCSS())
			.pipe(concat('app.min.css'))
			.pipe(gulp.dest('build'));
	});
	
	gulp.task('build-js', function() {
		return gulp
			.src([
				'app/app.js',
				'app/config.js',
				'app/templates.js',
				'node_modules/three/build/three.js',
				'node_modules/three/examples/js/controls/OrbitControls.js',
				'app/**/*.js'
			])
			.pipe(concat('app.min.js'))
			.pipe(ngAnnotate())
			//.pipe(uglify())
			.pipe(gulp.dest('build'));
	});
	
	gulp.task('build-template-js', function() {
		return gulp.src('app/**/*.html')
			.pipe(minifyHTML())
			.pipe(angularTemplateCache())
			.pipe(concat('templates.min.js'))
			.pipe(gulp.dest('build'));
	});
	
	gulp.task('watch', function () {
		gulp.start('default');
		watch('app/**/*', batch(function (events, done) {
			gulp.start('default', done);
		}));
	});
})();
