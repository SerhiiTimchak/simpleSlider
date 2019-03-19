var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del');


//Task for Saas
gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.scss') // take the sourse 
        .pipe(sass()) // convert scss to css 
        .pipe(gulp.dest('app/css')) // upload results into  app/css
        .pipe(browserSync.reload({ stream: true })); // refresh css on the page
});


//Task for JS
gulp.task('script', function() {
    return gulp.src(['app/js/common.js'])
        .pipe(browserSync.reload({ stream: true }));
});

//Task for HTML 
gulp.task('code', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }));
});

// This task for browser Sync (create server for autoreload)
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app',
        },
        notify: 'false',
    });
});

// We should delete dir dist before build new production proj 
gulp.task('clean', async function() {
    return del.sync('dist');
});

// Buldig project for prodaction:
gulp.task('prebuild', async function() {
    var buildCss = gulp.src(['app/css/main.css'])
        .pipe(gulp.dest('dist/css'));
    var buildJs = gulp.src(['app/js/**/*'])
        .pipe(gulp.dest('dist/js'));
    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
    var img = gulp.src(['app/img/*'])
        .pipe(gulp.dest('dist/img/'));
});

// Separate task for wathcing by files 
gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.scss', gulp.parallel('sass')); // watching by files .scss
    gulp.watch('app/*.html', gulp.parallel('code'));
    gulp.watch(['app/js/common.js'], gulp.parallel('script'));
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'sass'));